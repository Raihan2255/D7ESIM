import { AuthRouting } from '@/auth/auth-routing';
import { RequireAuth } from '@/auth/require-auth';
import { ErrorRouting } from '@/errors/error-routing';
import { Demo1Layout } from '@/layouts/demo1/layout';
import { DefaultPage, Demo1DarkSidebarPage } from '@/pages/dashboards';
import { Navigate, Route, Routes } from 'react-router';
import { PurchaseListing } from "@/pages/purchase"
import { TopUpListing } from "@/pages/top-up"
import Payment from '@/pages/Payment';
import CompletePage from '@/pages/CompletePage';
import OrderHistory from '@/pages/OrderHistory';
import Packages from '@/pages/Packages';
import { appRoutes } from '@/routes/app-routes';

export function AppRoutingSetup() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<Demo1Layout />}>
          <Route path="/" element={<DefaultPage />} />
          <Route path="/dark-sidebar" element={<Demo1DarkSidebarPage />} />
          <Route path={appRoutes.purchase} element={<PurchaseListing />} />
          <Route path={appRoutes.topUp} element={<TopUpListing />} />
          <Route path={appRoutes.orderHistory} element={<OrderHistory />} />
          <Route path={appRoutes?.payment} element={<Payment />} />
          <Route path={appRoutes?.paymentSuccess} element={<CompletePage />} />
          <Route path={`${appRoutes.purchase}/:id/:country`} element={<Packages />} />


        </Route>
      </Route>
      <Route path="error/*" element={<ErrorRouting />} />
      <Route path="auth/*" element={<AuthRouting />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
}
