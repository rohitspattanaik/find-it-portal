import { TableRow, type TableRowProps } from "./TableRow/TableRow";
import { TableHeader, type TableHeaderProps } from "./TableHeader/TableHeader";
import styles from "./Table.module.css";

interface TableProps {
    headers: TableHeaderProps;
    rows: TableRowProps[];
}

const Table = ({ headers, rows }: TableProps) => {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <TableHeader {...headers} />
                <tbody>
                    {rows.map((row) => (
                        <TableRow key={row.index} {...row} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
