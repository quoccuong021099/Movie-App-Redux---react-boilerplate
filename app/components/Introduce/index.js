import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { memo } from 'react';
const useStyles = makeStyles(() => ({
  color: {
    color: '#fff',
  },
  box: {
    padding: '40px 0',
    maxWidth: '700px',
  },
}));
function Introduce() {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Typography variant="h3" className={classes.color} gutterBottom>
        <b>Phim truyền hình chính kịch</b>
      </Typography>
      <Typography variant="h6" className={classes.color}>
        Có những câu chuyện hấp dẫn đến nỗi cần nhiều hơn một bộ phim mới có thể
        kể trọn. Loạt phim tội phạm, phim y khoa, khoa học viễn tưởng và rất
        nhiều thể loại khác – các bộ phim truyền hình này sẽ khiến bạn dán chặt
        mắt vào màn hình.
      </Typography>
    </Box>
  );
}

Introduce.propTypes = {};

export default memo(Introduce);
