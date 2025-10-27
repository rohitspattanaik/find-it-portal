import { Table } from "@mantine/core"

interface RowProps{
    index: string,
    data: any[]
}

interface WrappedTableProps {
    headers: string[],
    rows: RowProps[],
}

const WrappedTable = ({ headers, rows }: WrappedTableProps) => {

     const tableHeader = (
            <Table.Tr>
                {headers.map((header, index) => {
                    return (
                        <Table.Th key={index}>{header}</Table.Th>
                    )
                })}
            </Table.Tr>
        );
    
        const tableRows = rows?.map((row, index) => {
            return (
                <Table.Tr key={index}>
                    {row.data.map((cell, cellIndex) => {
                        return (
                            <Table.Td key={cellIndex}>{cell}</Table.Td>
                        )
                    })}
                </Table.Tr>
            )
        });

    return (
        <Table highlightOnHover>
            <Table.Thead>
                {tableHeader}
            </Table.Thead>
            <Table.Tbody>
                {tableRows}
            </Table.Tbody>
        </Table>
    )
}

export default WrappedTable;