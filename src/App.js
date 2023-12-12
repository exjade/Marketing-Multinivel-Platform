import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import UserContext from './context/user'
import { WatchListContextProvider } from './context/watchListContext'
import useAuthListener from './hooks/use-auth-listener'
import ProtectedRoute from './helpers/protected-routes'
import IsUserLoggedIn from './helpers/is-user-loggedin'
import FallBackLoader from './components/FallBackLoader'


// =========== Lazy Load Pages =========== //

// - Authentication
const Login = lazy(() => import('./pages/login'))
const Signup = lazy(() => import('./pages/signup'))
const ReferralLink = lazy(() => import('./pages/referral-signup'))
const ForgotPassword = lazy(() => import('./pages/forgotPassword'))

// - Dashboard
const Dashboard = lazy(() => import('./pages/dashboard'))
const Profile = lazy(() => import('./pages/profile'))
const Settings = lazy(() => import('./pages/settings'))
const Packages = lazy(() => import('./pages/packages'))
const InvestmentUserPackages = lazy(() => import('./pages/investment-user-packages'))
const Transactions = lazy(() => import('./pages/transactions'))
const SuccessfulPayment = lazy(() => import('./pages/successful-payment'))
const Withdrawal = lazy(() => import('./pages/withdrawal'))
const ReferralProgram = lazy(() => import('./pages/referrals/referral-program'))
const ReferralUsers= lazy(() => import('./pages/referrals/referral-network'))


// - Admin
const AdminDashboard = lazy(() => import('./pages/dashboard-admin'))
const ReferralHistory = lazy(() => import('./pages/referral-history'))

// - Error
const NotFound = lazy(() => import('./pages/not-found'))
// - Law
const Landing = lazy(() => import('./pages/landing'))


function App() {
  const { user } = useAuthListener()

  useEffect(() => { document.title = 'Welcome | CapitalTradersBusiness' }, [])

  return (
    <UserContext.Provider value={{ user }}>
      <WatchListContextProvider>
        <Router>
          <Suspense fallback={<FallBackLoader />} >
            <Switch>
              {/*Landing Page*/}
              <IsUserLoggedIn user={user} loggedInPath={ROUTES.LOGIN} path={ROUTES.LANDING} exact>
                <Landing />
              </IsUserLoggedIn>
              {/* Authentication */}
              <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
                <Login />
              </IsUserLoggedIn>
              <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP}>
                <Signup />
              </IsUserLoggedIn>
              <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.REFERRAL_SIGN_UP} exact>
                <ReferralLink />
              </IsUserLoggedIn>
              <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.RECOVERPASSWORD} exact>
                <ForgotPassword />
              </IsUserLoggedIn>


              <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                <Dashboard />
              </ProtectedRoute>
              <ProtectedRoute user={user} path={ROUTES.PACKAGES} exact>
                <Packages />
              </ProtectedRoute>
              <ProtectedRoute user={user} path={ROUTES.USERPACKAGES} exact>
                <InvestmentUserPackages />
              </ProtectedRoute>
              <ProtectedRoute user={user} path={ROUTES.PROFILE} exact>
                <Profile />
              </ProtectedRoute>
              <ProtectedRoute user={user} path={ROUTES.SETTINGS} exact>
                <Settings />
              </ProtectedRoute>
              <ProtectedRoute user={user} path={ROUTES.WITHDRAWAL} exact>
                <Withdrawal />
              </ProtectedRoute>
              <ProtectedRoute user={user} path={ROUTES.TRANSACTIONS} exact>
                <Transactions />
              </ProtectedRoute>
              <ProtectedRoute user={user} path={ROUTES.PAYMENT} exact>
                <SuccessfulPayment />
              </ProtectedRoute>
              {/* REFERRALS */}
              <ProtectedRoute user={user} path={ROUTES.NETWORK} exact>
                <ReferralProgram />
              </ProtectedRoute>
              <ProtectedRoute user={user} path={ROUTES.NETWORK_USERS} exact>
                <ReferralUsers />
              </ProtectedRoute>



              {/* ADMIN */}
              <ProtectedRoute user={user} path={ROUTES.ADMIN_DASHBOARD} exact>
                <AdminDashboard />
              </ProtectedRoute>

              {/* FUNCTIONALITIES */}
              <ProtectedRoute user={user} path={ROUTES.REFERRAL_HISTORY} exact>
                <ReferralHistory />
              </ProtectedRoute>


              <Route path="*" component={NotFound} />


            </Switch>
          </Suspense>
        </Router>

      </WatchListContextProvider>
    </UserContext.Provider>
  );
}


export default App;
