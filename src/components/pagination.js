import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePageChange = (value) => {
        var page = value;
        this.props.onSelectPage(page);            
    }

    render() {
        return (
            <nav aria-label="Page navigation example" style={{marginTop: 50}}>
                <ul class="pagination">{Array.from(Array(this.props.totalPage), (e, i) => {
                    if(this.props.currentPage === (i + 1))
                    {
                        return (
                            <li class="page-item active">
                                <a class="page-link" key={i} onClick = {() => this.handlePageChange(i + 1)}>
                                    {i + 1}
                                </a>
                            </li>
                        )
                    }
                    else {
                        return (
                            <li class="page-item">
                                <a class="page-link" key={i} onClick = {() => this.handlePageChange(i + 1)}>
                                    {i + 1}
                                </a>
                            </li>
                        )
                    }
                })}</ul>
            </nav>
        )
    }
}

export default Pagination