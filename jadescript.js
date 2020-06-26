const jade = require('jade');
const fs = require('fs');
const gridJSON = require('./grids.json') || [];
const grids = [{
  type: 'fill',
  container: [
    {
      row: [{
        xs: 'auto'
      }, {
        xs: 'auto'
      }, {
        xs: 'auto'
      }, {
        xs: 'auto'
      }, {
        xs: 'auto'
      }, {
        xs: 'auto'
      }]
    },
    {
      row: [{
        xs: 'auto'
      }, {
        xs: 'auto'
      }]
    },
    {
      row: [{
        xs: 'auto'
      }, {
        xs: 'auto'
      }]
    }
  ]
}, {
  container: [
    {
      row: [{
        xs: 1
      }, {
        xs: 11
      }]
    },
    {
      row: [{
        xs: 2
      }, {
        xs: 10
      }]
    },
    {
      row: [{
        xs: 3
      }, {
        xs: 9
      }]
    },
    {
      row: [{
        xs: 4
      }, {
        xs: 8
      }]
    },
    {
      row: [{
        xs: 5
      }, {
        xs: 7
      }]
    },
    {
      row: [{
        xs: 6
      }, {
        xs: 6
      }]
    },
    {
      row: [{
        xs: 7
      }, {
        xs: 5
      }]
    },
    {
      row: [{
        xs: 8
      }, {
        xs: 4
      }]
    },
    {
      row: [{
        xs: 9
      }, {
        xs: 3
      }]
    },
    {
      row: [{
        xs: 10
      }, {
        xs: 2
      }]
    },
    {
      row: [{
        xs: 11
      }, {
        xs: 1
      }]
    },
    {
      row: [{
        xs: 12
      }]
    }
  ]
}, {
  container: [
    {
      row: [{
        xs: 1,
        md: 6
      }, {
        xs: 11,
        md: 6
      }]
    },
    {
      row: [{
        xs: 2,
        md: 6
      }, {
        xs: 10,
        md: 6
      }]
    },
    {
      row: [{
        xs: 3
      }, {
        xs: 9
      }]
    }
  ]
}];
const convert = () => {
  const html = jade.renderFile('index.jade', {
    pretty: true,
    grids: gridJSON
  });
  fs.writeFile('index.html', html, function (err) {
    if (err) throw err;
    console.log('Grids Generated');
  });
};
const createJSON = () => {
  let gridsArr = [];
  for (grid of grids) {
    let containerArr = [];
    for (row of grid.container) {
      let rowObj = [];
      for (col of row.row) {
        let carr = [];
        if (col.xs) {
          carr.push('dgcol' + (col.xs === 'auto' ? '' : '-' + col.xs));
        }
        if (col.sm) {
          carr.push('dgcol-sm' + (col.sm === 'auto' ? '' : '-' + col.sm));
        }
        if (col.md) {
          carr.push('dgcol-md' + (col.md === 'auto' ? '' : '-' + col.md));
        }
        if (col.lg) {
          carr.push('dgcol-lg' + (col.lg === 'auto' ? '' : '-' + col.lg));
        }
        if (col.xl) {
          carr.push('dgcol-xl' + (col.xl === 'auto' ? '' : '-' + col.xl));
        }
        if (col.xxl) {
          carr.push('dgcol-xxl' + (col.xxl === 'auto' ? '' : '-' + col.xxl));
        }
        rowObj.push({
          col: '' + carr.join(' ')
        });
      }
      containerArr.push({
        row: rowObj
      });
    }
    gridsArr.push({
      type: grid.type === 'fill' ? '-fill' : '',
      container: containerArr
    });
  }
  fs.writeFile('grids.json', JSON.stringify(gridsArr), function (err) {
    if (err) throw err;
    console.log('json Generated');
    convert();
  });
}
createJSON();