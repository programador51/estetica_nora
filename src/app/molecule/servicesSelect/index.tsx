import React, { useEffect, useState } from "react";
import Select, {
  GroupBase,
  MultiValue,
  OptionProps,
  StylesConfig,
} from "react-select";
import {
  PropsUsersSelect,
  StateUsersSelect,
  ServiceOptionsSelect,
} from "./types";
import Spinner from "@/app/molecule/Spinner";
import uiInput from "@/app/atom/input/styles.module.scss";
import uiContainer from "@/app/molecule/usersSelect/styles.module.scss";
import { fetchServices } from "@/app/helpers/api/v1/services";
import HandledImage from "@/app/atom/image";

const customSelectStyles: StylesConfig<
  ServiceOptionsSelect,
  true,
  GroupBase<ServiceOptionsSelect>
> = {
  option: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
  container: (provided) => ({
    ...provided,
    position:"absolute",
    bottom:"0",
    width:"100%"
  }),
  control: (provided) => ({
    ...provided,
    borderColor: "var(--secondaryBackground)",
    borderWidth: "2.5px",
    borderRadius: "15px",
    padding: "0 0 0 15px",
    height: "50px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "100%",
  }),
  placeholder: (provided) => ({
    ...provided,
    height: "auto",
  }),
  input: (provided) => ({
    ...provided,
    height: "auto",
  }),
};
const CustomOption = (
  data: OptionProps<ServiceOptionsSelect, true, GroupBase<ServiceOptionsSelect>>
) => {
  
  return (
    <div
      ref={data.innerRef}
      {...data.innerProps}
      className={uiContainer.customOption}
    >
      <HandledImage src={data.data.imagen[0]}/>

      <span>{data.label}</span>
    </div>
  );
};

export default function ServicesSelect({
  onChange = () => {},
  value = null,
}: PropsUsersSelect) {
  const [state, setState] = useState<StateUsersSelect>({
    isLoading: true,
    options: [],
    selected: null,
  });

  useEffect(() => {
    (async function () {
      const apiServices = await fetchServices();

      setState((current) => ({
        ...current,
        isLoading: false,
        options: apiServices.map((item) => ({
          ...item,
          label: item.name,
          value: item.id,
          picture:item.imagen[0]
        })),
      }));
    })();
  }, []);

  const handleOnChange = (item: MultiValue<ServiceOptionsSelect>) => {
    setState((current) => ({
      ...current,
      selected: item,
    }));

    const parsed: ServiceOptionsSelect = JSON.parse(JSON.stringify(item));

    onChange(parsed);
  };

  if (state.isLoading) return <Spinner text="Cargando servicios" />;

  return (
    <div
      className={`${uiInput.inputContainer} ${uiContainer.containerInputSelect}`}
    >
      <label>Servicio</label>
      <Select
        isSearchable={false}
        options={state.options}
        onChange={handleOnChange}
        components={{ Option: CustomOption }}
        styles={customSelectStyles}
        placeholder="Selecciona un servicio"
      />
    </div>
  );
}
