import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

const Association = (props) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Governing Body
      </p>

      <table className='table'>
        <tr>
          <th>Sr. No</th>
          <th>Name of Body Member</th>
          <th>Designation</th>
          <th>Photograph</th>
        </tr>
        <tr>
          <td>1</td>
          <td>ABC</td>
          <td>President</td>
          <td></td>
        </tr>
        <tr>
          <td>2</td>
          <td>PQR</td>
          <td>Vice-President</td>
          <td></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Prof. XYZ</td>
          <td>Secretary</td>
          <td></td>
        </tr>
        <tr>
          <td>4</td>
          <td>LMN</td>
          <td>Treasurer</td>
          <td></td>
        </tr>
        <tr>
          <td>5</td>
          <td>Student</td>
          <td>Member</td>
          <td></td>
        </tr>
      </table>
    </Fragment>
  );
};

Association.propTypes = {};

export default Association;
