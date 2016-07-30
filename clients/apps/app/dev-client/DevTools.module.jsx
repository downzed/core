


core.Component('DevTools', [
  'ColorPicker',
  'socket',
  'AceEditor',
  'divide.Vertical',
  'ui.Select',
  'Property',
  'ui.Icon'
], (ColorPicker, socket, AceEditor, Vertical, Select, Property, Icon) => {
  return {
    getInitialState(){
      return {
        selectedColor: null,
        path: null,
        value: null,
        editing: false
      };
    },
    componentDidMount(){
      core.run('initialize')
      // socket.on('set', this.setSource);
    },
    setSource(data){
      // core.tree.set(['core', 'source'].concat(data.path), data.value);
    },
    selectColor(color, path){
      this.setState({ selectedColor: color });
      socket.action('set', { path: path, value: color.value });
    },
    jsonEdit(value){
      this.jsonValue = value;
      if(!this.state.editing){
        this.setState({
          editing: true
        });
      }
    },
    save(){
      socket.action('set', { path: path, value: this.jsonValue });
    },
    select(path, value){
      // this.setState({ path: path, value: value });
      console.log('selecting');
      core.tree.set('target', { path: path, value: value });
      socket.action('set', { path: path, value: value });
    },
    render(){
      return (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom:0, display: 'flex' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 50, borderBottom: '1px solid #ddd', display: 'flex' }}>
          {
            core.bind({ apps: 'apps', selectedAppPath: 'selectedAppPath'}, ({ apps, selectedAppPath })=>
              <Select options={ apps } selected={ selectedAppPath } onSelect={ this.onSelect } listStyle={{ left: 20, right: 'initial'}}>
                {
                  (select) => {
                    return (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 20px', borderRight: '1px solid #ddd', minWidth: 120, cursor: 'pointer' }}>{ selectedAppPath }</div>);
                  }
                }
              </Select>
            )
          }

        </div>

          <div style={{ position: 'absolute', top: 50, left: 0, right: 0, bottom:0, display: 'flex' }}>
            <Vertical>
              <div>
                {
                  core.bind('targetSource', source => {
                    return (
                      <div>
                        <Property key={ 0 } path={ [] } value={ source } initialyOpen={ true } isLast={ true }/>
                      </div>
                    );
                  })
                }
              </div>
              <div style={{ height: '100%'}}>
                { core.bind('target', target => <AceEditor value={ target ? core.utils.stringify(target.value, null, 4) : '' } onChange={ this.jsonEdit }/> ) }
                <Icon className="fa fa-save" style={{ position: 'absolute', top: 10, right: 10, color: 'green'}}/>
              </div>
            </Vertical>


          </div>
        </div>
      );
    }
  }
});
