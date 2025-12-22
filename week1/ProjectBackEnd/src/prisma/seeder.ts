import { PrismaInstance } from '../prisma';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = PrismaInstance;

async function main() {
  console.log('🌱 Starting database seeding...');

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing data');

  console.log('📦 Creating categories...');
  const categoryNames = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports & Outdoors',
    'Toys & Games',
    'Food & Beverages',
    'Beauty & Health',
    'Automotive',
    'Office Supplies'
  ];

  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.create({
        data: { name }
      })
    )
  );
  console.log(`✅ Created ${categories.length} categories`);

  console.log('👥 Creating users...');
  const users = await Promise.all(
    Array.from({ length: 50 }, async () => {
      const password = await bcrypt.hash('password123', 10);
      return prisma.user.create({
        data: {
          username: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          password: password,
        }
      });
    })
  );
  console.log(`✅ Created ${users.length} users`);

  console.log('🛍️  Creating products...');
  const products = await Promise.all(
    Array.from({ length: 100 }, () => {
      const category = faker.helpers.arrayElement(categories);
      return prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
          stock: faker.number.int({ min: 0, max: 500 }),
          categoryId: category.id,
          image: faker.image.url()
        }
      });
    })
  );
  console.log(`✅ Created ${products.length} products`);

  console.log('🛒 Creating orders...');
  const orders = [];
  for (let i = 0; i < 150; i++) {
    const user = faker.helpers.arrayElement(users);
    const numItems = faker.number.int({ min: 1, max: 5 });
    const orderProducts = faker.helpers.arrayElements(products, numItems);

    let total = 0;
    const orderItemsData = orderProducts.map((product) => {
      const quantity = faker.number.int({ min: 1, max: 5 });
      const itemTotal = Number(product.price) * quantity;
      total += itemTotal;

      return {
        productId: product.id,
        quantity,
        priceAtTime: product.price
      };
    });

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total,
        items: {
          create: orderItemsData.map(item => ({
            quantity: item.quantity,
            priceAtTime: item.priceAtTime,
            product: {
              connect: {
                id: item.productId
              }
            }
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });


    orders.push(order);
  }
  console.log(`✅ Created ${orders.length} orders`);

  // Summary
  const totalOrderItems = orders.reduce(
    (sum, order) => sum + order.items.length,
    0
  );

  console.log('\n🎉 Seeding completed successfully!');
  console.log('📊 Summary:');
  console.log(`   - Categories: ${categories.length}`);
  console.log(`   - Users: ${users.length}`);
  console.log(`   - Products: ${products.length}`);
  console.log(`   - Orders: ${orders.length}`);
  console.log(`   - Order Items: ${totalOrderItems}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });