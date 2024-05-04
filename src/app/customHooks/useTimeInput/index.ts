import { useState, ChangeEvent } from 'react';

const useTimeInput = (initialValue: string = '00:00') => {
    const [value, setValue] = useState<string>(initialValue);

    const calculateToleranceTime = (duration: string) => {
        const [hours, minutes] = duration.split(':').map(Number);
        let adjustedMinutes = minutes + 5;
        let adjustedHours = hours;

        // Ajustar los minutos si superan 59
        if (adjustedMinutes > 59) {
            adjustedMinutes = adjustedMinutes - 60;
            adjustedHours = hours + 1;
        }

        // Si las horas exceden 23, reiniciar a 0
        if (adjustedHours > 23) {
            adjustedHours = 0;
        }

        // Formatear el tiempo de tolerancia
        return `${String(adjustedHours).padStart(2, '0')}:${String(adjustedMinutes).padStart(2, '0')}`;
    };

    const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value;

        // Extraer horas y minutos de la entrada
        const [hours, minutes] = inputValue.split(':').map(Number);

        // Ajustar horas y minutos si son mayores a los valores máximos
        let adjustedHours = hours;
        let adjustedMinutes = minutes;

        // Si los minutos son mayores a 59, ajustar los valores
        while (adjustedMinutes > 59) {
            adjustedMinutes = adjustedMinutes - 60;
            adjustedHours = adjustedHours + 1;
        }

        // Si las horas exceden 23, reiniciar a 0
        if (adjustedHours > 23) {
            adjustedHours = 0;
        }

        // Formatear ajustes de horas y minutos
        const adjustedValue = `${String(adjustedHours).padStart(2, '0')}:${String(adjustedMinutes).padStart(2, '0')}`;

        // Actualizar el valor solo si es válido
        if (adjustedValue !== inputValue) {
            setValue(adjustedValue);
        } else {
            setValue(inputValue);
        }
    };

    return {
        value,
        handleTimeChange,
        calculateToleranceTime,
    };
};

export default useTimeInput;
