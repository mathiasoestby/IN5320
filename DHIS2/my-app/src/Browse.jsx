import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import {
    CircularLoader,
    NoticeBox,
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead
} from "@dhis2/ui";

const dataQuery = {
    dataSets: {
        resource: "dataSets/aLpVgfXiz0f",
        params: {
            fields: [
                "name",
                "id",
                "dataSetElements[dataElement[id, displayName]",
            ],
        },
    },
    dataValueSets: {
        resource: "dataValueSets",
        params: {
            orgUnit: "KiheEgvUZ0i",
            dataSet: "aLpVgfXiz0f",
            period: "2020",
        },
    },
};

function mergeData(data) {
    return data.dataSets.dataSetElements.map((d) => {
        let matchedValue = data.dataValueSets.dataValues.find((dataValues) => {
            if (dataValues.dataElement == d.dataElement.id) {
                return true;
            }
        });

        return {
            displayName: d.dataElement.displayName,
            id: d.dataElement.id,
            value: matchedValue.value,
        };
    });
}

export function Browse() {
    const { loading, error, data } = useDataQuery(dataQuery);
    if (error) {
        return <NoticeBox error title="Error during data query!">Error: </NoticeBox>;
    }

    if (loading) {
        return <CircularLoader aria-label="Default Loader" large />;
    }
    
    if (data) {
        let mergedData = mergeData(data);
        console.log(mergedData);

        return (
          <Table>
            <TableHead>
              <TableRowHead>
                <TableCellHead>Category</TableCellHead>
                <TableCellHead>Value</TableCellHead>
                <TableCellHead>Id</TableCellHead>
              </TableRowHead>
            </TableHead>
            <TableBody>
              {mergedData.map(d => (
                <TableRow key={d.id}>
                  <TableCell>{d.displayName}</TableCell>
                  <TableCell>{d.value}</TableCell>
                  <TableCell>{d.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
    }
}
