import {WithStyles} from "@material-ui/core/styles";
import {PropsWithChildren} from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";

interface iCustomTable {
    tableHeaderColor?: "warning" | "primary" | "danger" | "success" | "info" | "rose" | "gray",
    tableHead: string[],
    tableData: string[][]
}

function CustomTable({
                         classes,
                         tableHead,
                         tableData,
                         tableHeaderColor = "gray"
                     }: PropsWithChildren<WithStyles<typeof tableStyle> & iCustomTable>) {

    return (
        <div className={classes.tableResponsive}>
            <Table className={classes.table}>
                {tableHead !== undefined ? (
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow>
                            {tableHead.map((prop, key) => {
                                return (
                                    <TableCell
                                        className={classes.tableCell + " " + classes.tableHeadCell}
                                        key={key}
                                    >
                                        {prop}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {tableData.map((prop, key) => {
                        return (
                            <TableRow key={key}>
                                {prop.map((prop, key) => {
                                    return (
                                        <TableCell className={classes.tableCell} key={key}>
                                            {prop}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}


export default withStyles(tableStyle)(CustomTable);
