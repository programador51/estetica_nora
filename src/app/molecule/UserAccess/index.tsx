import React, { useEffect, useState } from "react";
import { GroupBase, MultiValue, OptionProps, StylesConfig } from "react-select";
import Select2 from "react-select/creatable";
import { PropsuserAccess, StateuserAccess, UserOptionsSelect } from "./types";
import Spinner from "@/app/molecule/Spinner";
import uiInput from "@/app/atom/input/styles.module.scss";
import uiContainer from "@/app/molecule/userAccess/styles.module.scss";
import { fetchRoles } from "@/app/helpers/api/v1/roles";

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
  menu:(provided) => ({
    ...provided,
    zIndex:"1000 !important"
  })
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

const UserAccess: React.FC<PropsuserAccess> = ({
  onChange = () => {},
  value = null,
}) => {
  const [state, setState] = useState<StateuserAccess>({
    isLoading: true,
    options: [],
    selected: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersApi = await fetchRoles();

        const optionsCombo: UserOptionsSelect[] = usersApi.map((user) => ({
          ...user,
          label: user.rol,
          value: user.id,
        }));

        setState((current) => ({
          ...current,
          isLoading:false,
          options: optionsCombo,
        }));
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchData();
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
      <label>Tipo</label>
      <Select2
        options={state.options}
        value={state.selected}
        onChange={handleOnChange}
        components={{ Option: CustomOption }}
        styles={customSelectStyles}
        placeholder="Selecciona"
      />
    </div>
  );
};

export default UserAccess;
