import { Inject, Injectable } from '@nestjs/common';
import { IPaymentProvider, PaymentProvider } from '@/payment/types/payment-provider';
import { UserService } from '@/user/services/user.service';
import { SubscriptionTierRepository } from '@/payment/repositories/subscription-tier.repository';
import { User } from '@/database/types/user';
import { SubscriptionTierName } from '@/database/types/subscription-tier';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(IPaymentProvider)
    private readonly paymentProvider: PaymentProvider,
    private readonly userService: UserService,
    private readonly subscriptionTierRepository: SubscriptionTierRepository,
  ) { }

  // TODO: refactor to return internal type rather than passing DB type around codebase
  public async createCustomerWithPremiumSubscription(user: User): Promise<User> {
    const customer = await this.paymentProvider.createCustomer(user.email);

    const subscriptionTierName = SubscriptionTierName.DentistPremium;
    const updatedUser = await this.userService.updateUser(user.id, { paymentProviderCustomerId: customer.id });
    const premiumSubscriptionTier = await this.subscriptionTierRepository.findByName(subscriptionTierName);

    await this.paymentProvider.createSubscription(updatedUser, premiumSubscriptionTier);

    return this.userService.updateUser(user.id, {
      subscription: {
        create: {
          subscriptionTier: {
            connect: {
              name: subscriptionTierName,
            },
          },
        },
      },
    });
  }
}
