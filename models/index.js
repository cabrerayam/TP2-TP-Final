import User from "./User.js";
import Role from "./Role.js";
import Pedido from "./Pedido.js"
import Producto from "./Producto.js"

Role.hasMany(User,{
     foreignKey:'roleId',
})
User.belongsTo(Role,{
     foreignKey:"roleId"
})


export { User, Role };

/*
* Usuario relacionado con roles
La tabla de pedido va a tener muchos productos 

pedido a usuario uno a uno
pedido tiene muchos productos 
un producto tiene muchos pedidos
tabla intermedia pedido con pedidos y productos con un controlador ProductosPedidos
https://sequelize.org/docs/v6/core-concepts/assocs/
https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances

*/

