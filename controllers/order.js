const { QueryTypes } = require('sequelize');

class Order
{
    static async createOrder(db,obj) {
                
        
            console.log(obj); 
            const order = await db.Order.sequelize.query(
                'INSERT INTO Prods (prod_name, createdAt, updatedAt) VALUES (:prod_name,NOW(),NOW())',
                {
                  replacements: {
                    prod_name: obj.prod_name,
                    

                  },
                  type: QueryTypes.INSERT
                }
              );
/*
              const orderIdQuery = await db.Order.sequelize.query('SELECT LAST_INSERT_ID() AS orderId', {
                type: QueryTypes.SELECT,
              });
            const orderId=orderIdQuery[0].orderId;  
            console.log(orderIdQuery[0].orderId);
          const itemInsertPromises = obj.items.map(async (item) => {
            await db.OrderItem.sequelize.query(
              'INSERT INTO Orderitems (order_id,product_id, quantity,createdAt, updatedAt) VALUES (:order_id,:product_id,:quantity,NOW(),NOW())',
              {
                replacements: {
                  order_id:orderId,
                  product_id: item.product_id,
                  quantity: item.quantity
                  

                },
                type: QueryTypes.INSERT
              }
            );
          });
          await Promise.all(itemInsertPromises);

       */     
            return prod_name;
        
    }
    static async updateOrder(db,obj) {
      const ordercheck = await db.Prods.sequelize.query(
          'SELECT * FROM Prods WHERE prod_name = :id',
          {
            replacements: { id: obj.prod_name },
            type: QueryTypes.SELECT,
          }
        );
        console.log(ordercheck.length);
      if (ordercheck.length == 0) {
          return false;
      }
          console.log(obj); 
          const order = await db.Prods.sequelize.query(
              'UPDATE Prods SET sold_status = :status,updatedAt=NOW() WHERE order_id = :order_id',
              {
                replacements: {
                  status: obj.sold_status,
                  order_id:obj.prod_name

                },
                type: QueryTypes.UPDATE
              }
            );
          if(order.length !=0){
              return true;
          }
          else{
              return false;
          }
                  
  }

  static async listOrder(db,customer_id){
    const list = await db.Prods.sequelize.query('SELECT * FROM Prods where sold_status="true" AND customer_id=:id',
    {
      replacements: {
        id: prod_name,     
  
      },
      type: QueryTypes.SELECT
    }
   
    );
    if (list.length == 0) {
      return false;
  ``}
    return list; 
``}   
  
/*
static async listOrderItem(db,orderid){
  const list = await db.OrderItem.sequelize.query('SELECT * FROM Orderitems where order_id=:id ',
  {
    replacements: {
      id: orderid,     

    },
    type: QueryTypes.SELECT
  }
  );
  if (list.length == 0) {
    return false;
}
  return list; 
``}*/


/*static async CartList(db,customer_id){
  const list = await db.Order.sequelize.query('SELECT * FROM Orders where payment_status !="paid" AND customer_id = :id',
  {
    replacements: {
      id: customer_id     

    },
    type: QueryTypes.SELECT
  }
  );
  if (list.length == 0) {
    return false;
``}
  return list; 
``}*/

}


module.exports=Order;