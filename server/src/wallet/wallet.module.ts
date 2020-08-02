import { Module, forwardRef } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletEntity } from './entity/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@user/entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from '@user/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    AuthModule,
    TypeOrmModule.forFeature([WalletEntity, UserEntity]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
