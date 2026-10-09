import type { CheckoutFormData } from '../../pages/CheckoutPage';
import type { CheckoutDataStrategy } from './CheckoutDataStrategy';

export class ValidCheckoutStrategy implements CheckoutDataStrategy {
  getData(): CheckoutFormData {
    return {
      name: 'Test User',
      email: 'test.user@example.com',
    };
  }
}
