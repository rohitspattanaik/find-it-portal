import styles from "./TableHeader.module.css";

export interface TableHeaderProps {
    headers: string[];
}

export const TableHeader = ({ headers }: TableHeaderProps) => {
    return (
        <thead className={styles.tableHeaderRow}>
            <tr>
                {headers.map((header, index) => (
                    <th key={index} className={styles.tableHeaderCell}>{header}</th>
                ))}
            </tr>
        </thead>
    );
};
