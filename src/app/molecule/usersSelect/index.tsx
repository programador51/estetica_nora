import React, { useEffect, useState } from "react";
import { GroupBase, MultiValue, OptionProps, StylesConfig } from "react-select";
import Select2 from "react-select/creatable";
import { PropsUsersSelect, StateUsersSelect, UserOptionsSelect } from "./types";
import Spinner from "@/app/molecule/Spinner";
import uiInput from "@/app/atom/input/styles.module.scss";
import uiContainer from "@/app/molecule/usersSelect/styles.module.scss";
import { fetchUsers } from "@/app/helpers/api/v1/users";

const customSelectStyles: StylesConfig<
  UserOptionsSelect,
  true,
  GroupBase<UserOptionsSelect>
> = {
  option: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
  container: (provided) => ({
    ...provided,
    position: "absolute",
    bottom: "0",
    width: "100%",
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
  menu: (provided) => ({
    ...provided,
    zIndex: "1000 !important",
  }),
};
const CustomOption = (
  data: OptionProps<UserOptionsSelect, true, GroupBase<UserOptionsSelect>>
) => {
  const [imgSrc, setImgSrc] = useState(data.data.profilePicture);
  const handleImageError = () => {
    setImgSrc("/no_image.png");
  };
  return (
    <div
      ref={data.innerRef}
      {...data.innerProps}
      className={uiContainer.customOption}
    >
      <img src={`${imgSrc}`} alt={data.label} onError={handleImageError} />
      <span>{data.label}</span>
    </div>
  );
};

export default function UsersSelect({
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
      const usersApi = await fetchUsers();

      const optionsCombo: UserOptionsSelect[] = usersApi
        .map((user) => ({
          ...user,
          label: user.name,
          value: user.id,
        }))
        .filter((item) => item.type === "usuario" && item.isBlocked === false);

      setState((current) => ({
        ...current,
        isLoading: false,
        options: optionsCombo,
      }));
    })();
  }, []);

  const handleOnChange = (item: MultiValue<UserOptionsSelect>) => {
    setState((current) => ({
      ...current,
      selected: item,
    }));

    const parsed: UserOptionsSelect = JSON.parse(JSON.stringify(item));

    onChange(parsed);
  };

  if (state.isLoading) return <Spinner text="Cargando usuarios" />;

  return (
    <div
      className={`${uiInput.inputContainer} ${uiContainer.containerInputSelect}`}
    >
      <label>Cliente</label>
      <Select2
        options={state.options}
        value={state.selected}
        onChange={handleOnChange}
        components={{ Option: CustomOption }}
        styles={customSelectStyles}
        placeholder="Selecciona o escribe un nombre"
      />
    </div>
  );
}
