
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BLOCK = 1.2;

async function runMining(){
  const users = await prisma.user.findMany({include:{wallet:true}});

  for(const u of users){
    const reward = (u.power/100000) * BLOCK;
    await prisma.wallet.update({
      where:{userId:u.id},
      data:{ zmc: u.wallet.zmc + reward }
    });

    await prisma.miningLog.create({
      data:{ userId:u.id, amount:reward }
    });
  }

  console.log("Mining cycle completed");
}

setInterval(runMining, 600000); // 10 minutes
