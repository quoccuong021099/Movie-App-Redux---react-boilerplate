import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
    height: '90vh',
    backgroundImage: `url(${'https://image.tmdb.org/t/p/w500/8s4h9friP6Ci3adRGahHARVd76E.jpg'})`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '50px',
  },
  typo: {
    maxWidth: '700px',
    color: '#fff',
    padding: '10px 0',
    lineHeight: '50px',
  },
}));
function DetailComponent() {
  console.log('API_URL', process.env.API_URL);
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography variant="h3" className={classes.typo}>
        Những bác sĩ tài hoa
      </Typography>
      <Typography variant="h6" className={classes.typo}>
        Năm bác sĩ – là những người bạn từ thời còn ở trường y – cùng tái hợp ở
        một bệnh viện với tư cách là đồng nghiệp trong mảng khách hàng VIP.
      </Typography>
      <Typography variant="subtitle1" className={classes.typo}>
        Diễn viên chính:Cho Jung Seok,Yoo Yeon Seok,Jung Kyung Ho
      </Typography>
      <Typography variant="subtitle2" className={classes.typo}>
        Tác giả:Shin Won Ho,Lee Woo Jung
      </Typography>
    </Box>
  );
}

DetailComponent.propTypes = {};

export default memo(DetailComponent);
