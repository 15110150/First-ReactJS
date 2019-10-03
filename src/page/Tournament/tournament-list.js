import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import TableFooter from '@material-ui/core/TableFooter';
import Pagination from '../../components/pagination';
import * as moment from 'moment'

const API = 'http://10.19.10.82:7600//tournament/FilterTournament?';
const DEFAULT_QUERY = '&pageSize=20';

const useStyles = theme => ({
  input: {
      margin: 10,
      width: 200,
  }
});

class TournamentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: [],
      hasError: false,
      isUpdate: false,
      selectPage: 1,
      totalPage: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch() {
    this.state.setState({
      hasError: true
    })
  }

  fetchData(name, federationID, fromDate, pageNumber) {
    const tempDate = moment(fromDate).format('MM/DD/YYYY')
    const filter = 'Name=' + name + '&FederationID=' + federationID + '&StartDate=' + tempDate + '&pageNumber=' + pageNumber;
    const url = API + filter + DEFAULT_QUERY;
    fetch(url)
      .then(data => data.json())
      .then(data => this.setState({ tournaments: data.Items, totalPage: data.TotalPages }));
  }

  componentDidMount() {
    this.fetchData('', 0, '', 1);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isUpdate !== prevProps.isUpdate) {
      this.fetchData(this.props.filter.name, this.props.filter.federationID, this.props.filter.fromDate, 1);
    }
    if (this.state.isUpdate !== prevState.isUpdate) {
      this.fetchData(this.props.filter.name, this.props.filter.federationID, this.props.filter.fromDate, this.state.selectPage);
    }
  }

  handlePage = (page) => {
    this.setState({
      selectPage: page,
      isUpdate: !this.state.isUpdate
    });
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Federation</TableCell>
              <TableCell>Flag</TableCell>
              <TableCell>StartDate</TableCell>
              <TableCell>EndDate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.tournaments.map((row, index = 1) => (
              <TableRow key={row.ID}>
                <TableCell component="th" scope="row">
                  {index++}
                </TableCell>
                <TableCell>{row.Name}</TableCell>
                <TableCell>{row.Federation.Acronym}</TableCell>
                <TableCell>{row.Federation.Flag}</TableCell>
                <TableCell>{moment(row.StartDate).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{moment(row.EndDate).format('DD/MM/YYYY')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <Pagination totalPage={this.state.totalPage} onSelectPage={this.handlePage} currentPage={this.state.selectPage} />
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    );
  }
}

export default TournamentList