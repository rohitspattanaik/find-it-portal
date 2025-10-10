import Button from "../../Button/Button";
import styles from "./TableRow.module.css";

export interface TableRowAction {
    onClick: () => void;
    label: string;
}

export interface TableRowProps {
    index: string;
    data: string[];
    actions?: TableRowAction[];
}

const ActionsModal = ({ actions }: { actions: TableRowAction[] }) => {
    return (
        <div>
            <p>Actions</p>
        </div>
    );
};

export const TableRow = ({ index, data, actions }: TableRowProps) => {
    return (
        <tr key={index} className={styles.tableRow}>
            {data.map((item, index) => (
                <td key={index} className={styles.tableRowCell}>{item}</td>
            ))}
            {actions && <Button text="..." onClick={() => <ActionsModal actions={actions} />}>
                </Button>}
        </tr>
    );
};
