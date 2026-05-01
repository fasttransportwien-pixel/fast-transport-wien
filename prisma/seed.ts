import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // ---- Admin user ----
  const email = process.env.ADMIN_EMAIL || 'fasttransportwien@gmail.com';
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe!2026';
  const name = process.env.ADMIN_NAME || 'Admin';

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, name, passwordHash },
  });

  // ---- Discount code ----
  const code = process.env.DISCOUNT_CODE || 'FTW20';
  const effective = Math.round(parseFloat(process.env.PRICE_DISCOUNT_PER_ADDRESS_GROSS || '20') * 100);
  const maxDiscount = Math.round(parseFloat(process.env.DISCOUNT_MAX_GROSS || '100') * 100);

  await prisma.discountCode.upsert({
    where: { code },
    update: {
      effectivePriceGrossCents: effective,
      maxDiscountGrossCents: maxDiscount,
      active: true,
    },
    create: {
      code,
      effectivePriceGrossCents: effective,
      maxDiscountGrossCents: maxDiscount,
      active: true,
      description: 'Standard 20% Promo',
    },
  });

  console.log(`Seed complete. Admin: ${email}, Discount code: ${code}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
