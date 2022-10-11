import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import '../assets/styles/style.css';

import NotFoundPage from 'app/components/NotFoundPage/loadable';
import PrivateRoute from 'app/components/PrivateRoute/loadable';
import AuthStorage from 'app/components/AuthStorage/loadable';
// import Dashboard from 'app/components/Dashboard/loadable';
//= ======================================================================
import LoginPage from 'app/containers/LoginPage/loadable';
import UserDetail from 'app/containers/UserDetail/loadable';
import UserPage from 'app/containers/UserPage/loadable';
import QuestionPage from 'app/containers/QuestionPage/loadable';
import QuestionDetail from 'app/containers/QuestionDetail/loadable';
import Leaderboard from 'app/containers/Leaderboard/loadable';
import Interview from 'app/containers/Interview/loadable';
import theme from 'assets/theme/index';

export default function App() {
  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
      <BrowserRouter>
        <AuthStorage>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <PrivateRoute exact path="/" component={UserPage} />
              <PrivateRoute path="admin/user/:id" component={UserDetail} />
              <PrivateRoute path="/user" component={UserPage} />
              <PrivateRoute path="/question/:id" component={QuestionDetail} />
              <PrivateRoute path="/question" component={QuestionPage} />
              <PrivateRoute path="/leaderboard" component={Leaderboard} />
              <PrivateRoute path="/interview" component={Interview} />
              <Route component={NotFoundPage} />
            </Switch>
          </ThemeProvider>
        </AuthStorage>
      </BrowserRouter>
    </div>
  );
}
