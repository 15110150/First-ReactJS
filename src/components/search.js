import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/styles';
import TournamentList from '../page/Tournament/tournament-list';

const API = 'http://10.19.10.82:7600/federation/GetFederations';

const useStyles = theme => ({
    input: {
        margin: 10,
        width: 200,
    }
});

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            federation: [],
            federationID: 0,
            fromDate: null,
            hasError: false,
            updateTournament: false
        };
    }

    componentDidMount() {
        fetch(API)
            .then(data => data.json())
            .then(data => this.setState({ federation: data }));
    }

    handleDateChange = (event) => {
        this.setState({
            fromDate: event
        });
    }

    handleChange = (event) =>{
        this.setState({
            federationID : event.target.value
        });
    }

    handleTextChange = (event) => {
        console.log(event)
        this.setState({
            name : event.target.value
        });
      };

    searchTournamet = () =>{
        this.setState(({
            updateTournament : !this.state.updateTournament
        }));
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
            <Box display="flex" justifyContent="center">
                <Box p={1}>
                    <TextField
                        id="standard-textarea"
                        label="Name"
                        multiline
                        className={classes.input}
                        margin="normal"
                        value={this.state.name}
                        onChange={this.handleTextChange}
                    />
                </Box>
                <Box p={1}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            className={classes.input}
                            label="from Date"
                            value={this.state.fromDate}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Box>
                <Box p={1}>
                    <FormControl className={classes.input}>
                        <InputLabel htmlFor="age-simple">Federation</InputLabel>
                        <Select
                            onChange = {this.handleChange}
                            className={classes.input}
                            value={this.state.federationID}
                        >
                            <MenuItem value="">
                                <em>Get All</em>
                            </MenuItem>
                            {this.state.federation.map(fe => (
                                <MenuItem key={fe.ID} value={fe.ID}>{fe.Name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box p={1} display="flex" alignItems="center" className={classes.input}>
                    <Button variant="contained" color="primary" onClick = {this.searchTournamet}>
                        Search
                </Button>
                </Box>
            </Box>
            <TournamentList filter={this.state} isUpdate={this.state.updateTournament}/> 
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(SearchBar)