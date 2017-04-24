import React, {} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {AComponent} from './a.component';
import {BComponent} from './b.component';
import {CComponent} from './c.component';
import {DComponent} from './d.component';
const RoutesComponent = ({}) => {
    return (
        <div>
            <Switch>
                <Route component={DComponent}/>
            </Switch>

            <Switch>
                <Route component={BComponent}/>
            </Switch>

            <Route path='/a' component={AComponent}/>
            <Route path='/b' component={BComponent}/>
            <Route path='/c' component={CComponent}/>
            <Route path='/d' component={DComponent}/>

            <Switch>
                <Route path='/ab' component={AComponent}/>
            </Switch>
        </div>

    )
};

export default RoutesComponent;
