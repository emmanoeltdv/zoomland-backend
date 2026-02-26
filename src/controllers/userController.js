
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/:id', async (req,res)=>{
  const user = await prisma.user.findUnique({
    where:{id:req.params.id},
    include:{wallet:true}
  });
  res.json(user);
});

module.exports = router;
