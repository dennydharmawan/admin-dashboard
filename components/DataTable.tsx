import {
  AgGridEvent,
  ColDef,
  ColGroupDef,
  ColumnApi,
  GridApi,
  GridOptions,
  NavigateToNextCellParams
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";

import {
  AppBar,
  Button,
  createStyles,
  fade,
  InputBase,
  TextField,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

type Athlete = {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
};

const styles = (theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
    },
    toolbarGutters: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: '17px',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: '17px', // align with table
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  });

type Props = {} & WithStyles<typeof styles>;
type State = GridOptions;

//https://en.morzel.net/post/safer-ag-grid-react-column-definitions-with-typescript

class GridExample extends Component<Props, State> {
  gridApi = {} as GridApi;
  gridColumnApi = {} as ColumnApi;
  state: State = {
    columnDefs: [
      {
        field: 'athlete',
        filter: 'agTextColumnFilter',
        floatingFilter: true,
      },
      {
        field: 'age',
        minWidth: 120,
        filter: 'agNumberColumnFilter',
        // filterParams: {
        //   filterOptions: [
        //     'empty',
        //     {
        //       displayKey: 'evenNumbers',
        //       displayName: 'Even Numbers',
        //       test: function (filterValue, cellValue) {
        //         return cellValue != null && cellValue % 2 === 0;
        //       },
        //       hideFilterInput: true,
        //     },
        //     {
        //       displayKey: 'oddNumbers',
        //       displayName: 'Odd Numbers',
        //       test: function (filterValue, cellValue) {
        //         return cellValue != null && cellValue % 2 !== 0;
        //       },
        //       hideFilterInput: true,
        //     },
        //     {
        //       displayKey: 'blanks',
        //       displayName: 'Blanks',
        //       test: function (filterValue, cellValue) {
        //         return cellValue == null;
        //       },
        //       hideFilterInput: true,
        //     },
        //   ],
        //   suppressAndOrCondition: true,
        // },
        floatingFilter: true,
      },
      {
        field: 'country',
        filter: 'agTextColumnFilter',
        floatingFilter: true,
      },
      {
        field: 'year',
        filter: 'agNumberColumnFilter',
        maxWidth: 100,
        floatingFilter: true,
      },
      { field: 'sport' },
      {
        field: 'gold',
        filter: 'agNumberColumnFilter',
        floatingFilter: true,
      },
      {
        field: 'silver',
        filter: 'agNumberColumnFilter',
        floatingFilter: true,
      },
      {
        field: 'bronze',
        filter: 'agNumberColumnFilter',
        floatingFilter: true,
      },
      {
        field: 'total',
        filter: 'agNumberColumnFilter',
        floatingFilter: true,
      },
    ],
    defaultColDef: {
      width: 160,
      sortable: true,
      filter: true,
      resizable: true,
    },
    rowData: undefined,
    quickFilterText: undefined,
  };

  constructor(props: Props) {
    super(props);

    this.navigateToNextCell = this.navigateToNextCell.bind(this);
  }

  navigateToNextCell = (params: NavigateToNextCellParams) => {
    var previousCell = params.previousCellPosition;
    var suggestedNextCell = params.nextCellPosition;

    var KEY_UP = 38;
    var KEY_DOWN = 40;
    var KEY_LEFT = 37;
    var KEY_RIGHT = 39;

    switch (params.key) {
      case KEY_DOWN:
        previousCell = params.previousCellPosition;
        // set selected cell on current cell + 1
        this.gridApi.forEachNode(function (node: {
          rowIndex: any;
          setSelected: (arg0: boolean) => void;
        }) {
          if (previousCell.rowIndex + 1 === node.rowIndex) {
            node.setSelected(true);
          }
        });
        return suggestedNextCell;
      case KEY_UP:
        previousCell = params.previousCellPosition;
        // set selected cell on current cell - 1
        this.gridApi.forEachNode(function (node: {
          rowIndex: number;
          setSelected: (arg0: boolean) => void;
        }) {
          if (previousCell.rowIndex - 1 === node.rowIndex) {
            node.setSelected(true);
          }
        });
        return suggestedNextCell;
      case KEY_LEFT:
      case KEY_RIGHT:
        return suggestedNextCell;
      default:
        throw 'this will never happen, navigation is always one of the 4 keys above';
    }
  };

  //https://medium.com/@anuhosad/debouncing-events-with-react-b8c405c33273
  onQuickFilterText = (event: { target: { value: any } }) => {
    this.setState({ quickFilterText: event.target.value });
  };

  onClearFilterClicked = () => {
    this.gridApi.setFilterModel(null);
    this.setState({ quickFilterText: undefined });
  };

  onGridReady = (params: AgGridEvent) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = (data: any) => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      'GET',
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }

      this.gridColumnApi.autoSizeAllColumns();
    };
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary" elevation={0}>
          <Toolbar
            className={classes.toolbar}
            classes={{
              gutters: classes.toolbarGutters,
            }}
            variant="dense"
            disableGutters={true}
          >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Quick filter..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={this.state.quickFilterText || ''}
                onChange={this.onQuickFilterText}
              />
            </div>
            <Button
              color="primary"
              variant="contained"
              onClick={this.onClearFilterClicked}
              size="small"
            >
              Reset All
            </Button>
          </Toolbar>
        </AppBar>
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowDragManaged={true}
            animateRows={true}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
            rowSelection="single"
            quickFilterText={this.state.quickFilterText}
            suppressMenuHide={true}
            navigateToNextCell={this.navigateToNextCell}
            enableCellTextSelection={true}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(GridExample);
