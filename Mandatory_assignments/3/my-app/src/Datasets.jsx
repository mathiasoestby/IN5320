import React from "react";
import { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import {
    Menu,
    MenuDivider,
    MenuItem,
    CircularLoader,
    NoticeBox,
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead,
} from "@dhis2/ui";

const request = {
    request0: {
        resource: "/dataSets",
        params: {
            fields: "id,displayName,created",
            paging: "false",
        },
    },
};

function DatasetsMenu({ activeProgram, setActiveProgram, data }) {
    return (
        <Menu>
            {data &&
                data.map((row) => (
                    <MenuItem
                        key={row.id}
                        label={row.displayName}
                        active={activeProgram === row.displayName}
                        onClick={() => setActiveProgram(row.displayName)}
                    />
                ))}
        </Menu>
    );
}

function DataSetsTable({ activeProgram, data }) {
    return (
        <Table>
            <TableHead>
                <TableRowHead>
                    <TableCellHead>Category</TableCellHead>
                    <TableCellHead>ID</TableCellHead>
                    <TableCellHead>Creation date</TableCellHead>
                </TableRowHead>
            </TableHead>
            <TableBody>
                {data
                    .filter((row) => row.displayName === activeProgram)
                    .map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.displayName}</TableCell>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.created}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}

export function Datasets(props) {
    const [activeProgram, setActiveProgram] = useState(""); // default: no program chosen

    const { loading, error, data } = useDataQuery(request);

    // only log to console when query is made
    useEffect(() => {
        if (data) {
            console.log("API response:", data?.request0?.dataSets);
        }
    }, [data]);

    if (error) {
        return (
            <NoticeBox error title="Something went wrong">
                We couldn't load the datasets. Please try again later.
                <details>
                    <summary>Technical details</summary>
                    <pre>{error.message}</pre>
                </details>
            </NoticeBox>
        );
    }

    if (loading) {
        return <CircularLoader aria-label="Default Loader" large />;
    }

    if (data) {
        return (
            <div style={{ display: "flex", columnGap: "1rem" }}>
                <nav>
                    <DatasetsMenu
                        activeProgram={activeProgram}
                        setActiveProgram={setActiveProgram}
                        data={data?.request0?.dataSets}
                    />
                </nav>
                <main>
                    {activeProgram ? (
                        <DataSetsTable
                            activeProgram={activeProgram}
                            data={data?.request0?.dataSets}
                        />
                    ) : (
                        <NoticeBox title="No program selected">
                            Please select a program from the menu to display its
                            details.
                        </NoticeBox>
                    )}
                </main>
            </div>
        );
    }
}
