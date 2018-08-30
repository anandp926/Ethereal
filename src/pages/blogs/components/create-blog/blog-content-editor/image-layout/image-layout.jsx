import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import './image-layout.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 555,
    height: 500,
  },
});


  const tileData = [
    {
      img: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto%3Dcompress%26cs%3Dtinysrgb%26h%3D350&imgrefurl=https://www.pexels.com/search/beauty/&h=350&w=528&tbnid=ZAXhvwKefKr6jM:&q=image&tbnh=132&tbnw=200&usg=AFrqEzdfO1R_OkF0ZLQQlVQqkxn4WZ3W6Q&vet=1&docid=pFs_4Fcq5AgpmM&itg=1&sa=X&ved=2ahUKEwiHls7Djo_dAhXUfH0KHUthCcgQ_B0wG3oECAgQCQ",
      title: 'Image',
      id:1
    },
    {
    img: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto%3Dcompress%26cs%3Dtinysrgb%26h%3D350&imgrefurl=https://www.pexels.com/search/beauty/&h=350&w=528&tbnid=ZAXhvwKefKr6jM:&q=image&tbnh=132&tbnw=200&usg=AFrqEzdfO1R_OkF0ZLQQlVQqkxn4WZ3W6Q&vet=1&docid=pFs_4Fcq5AgpmM&itg=1&sa=X&ved=2ahUKEwiHls7Djo_dAhXUfH0KHUthCcgQ_B0wG3oECAgQCQ",
    title: 'Image',
    id:2
    },
    {
    img: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto%3Dcompress%26cs%3Dtinysrgb%26h%3D350&imgrefurl=https://www.pexels.com/search/beauty/&h=350&w=528&tbnid=ZAXhvwKefKr6jM:&q=image&tbnh=132&tbnw=200&usg=AFrqEzdfO1R_OkF0ZLQQlVQqkxn4WZ3W6Q&vet=1&docid=pFs_4Fcq5AgpmM&itg=1&sa=X&ved=2ahUKEwiHls7Djo_dAhXUfH0KHUthCcgQ_B0wG3oECAgQCQ",
    title: 'Image',
    id:3
    },
    {
    img: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto%3Dcompress%26cs%3Dtinysrgb%26h%3D350&imgrefurl=https://www.pexels.com/search/beauty/&h=350&w=528&tbnid=ZAXhvwKefKr6jM:&q=image&tbnh=132&tbnw=200&usg=AFrqEzdfO1R_OkF0ZLQQlVQqkxn4WZ3W6Q&vet=1&docid=pFs_4Fcq5AgpmM&itg=1&sa=X&ved=2ahUKEwiHls7Djo_dAhXUfH0KHUthCcgQ_B0wG3oECAgQCQ",
    title: 'Image',
    id:4
    }
  ];
 
function TitlebarGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList}>
        {tileData.map(tile => (
          <GridListTile key={tile.id}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              subtitle={
                <div className="InputAddOn">
                    <span>
                    <button className="image-layout-btn">copy</button>
                    </span>
                    <input type="text" className="InputAddOn-field"/>
                </div>
                }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);