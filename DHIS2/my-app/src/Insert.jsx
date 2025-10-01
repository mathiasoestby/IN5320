import React from "react";
import { useDataMutation } from "@dhis2/app-runtime";
import {
    ReactFinalForm,
    SingleSelectFieldFF,
    InputFieldFF,
    Button,
    hasValue,
    composeValidators,
    number,
} from "@dhis2/ui";

const dataMutationQuery = {
    resource: "dataValueSets",
    type: "create",
    dataSet: "aLpVgfXiz0f",
    data: ({ value, dataElement, period, orgUnit }) => ({
        dataValues: [
            {
                dataElement: dataElement,
                period: period,
                orgUnit: orgUnit,
                value: value,
            },
        ],
    }),
};

export function Insert() {
    const [mutate, { loading, error }] = useDataMutation(dataMutationQuery);

    function onSubmit(formInput) {
        mutate({
            value: formInput.value,
            dataElement: formInput.dataElement,
            period: "2020",
            orgUnit: "KiheEgvUZ0i",
        });
    }

    return (
        <ReactFinalForm.Form onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <ReactFinalForm.Field
                        name="dataElement"
                        label="Select field"
                        component={SingleSelectFieldFF}
                        options={[
                            { label: "Total Population", value: "WUg3MYWQ7pt" },
                            {
                                label: "Population of women of child bearing age (WRA)",
                                value: "vg6pdjObxsm",
                            },
                            {
                                label: "Total population < 5 years    ",
                                value: "DTtCy7Nx5jH",
                            },
                            {
                                label: "Expected pregnancies",
                                value: "h0xKKjijTdI",
                            },
                            {
                                label: "Total population < 1 year ",
                                value: "DTVRnCGamkV",
                            },
                        ]}
                        validate={hasValue}
                    />
                    <ReactFinalForm.Field
                        name="value"
                        label="Value"
                        component={InputFieldFF}
                        validate={composeValidators(hasValue, number)}
                    />
                    <Button type="submit" primary>
                        Submit
                    </Button>
                </form>
            )}
        </ReactFinalForm.Form>
    );
}
