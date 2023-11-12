import User from "./User.js";
import Role from "./Role.js";
import Pedido from "./Pedido.js"
import Producto from "./Producto.js"
import PedidoProducto from "./PedidoProducto.js";

Role.hasMany(User,{
     foreignKey:'roleId',
})
User.belongsTo(Role,{
     foreignKey:"roleId"
})

User.hasMany(Pedido, {
     foreignKey: 'userId'
})

Pedido.belongsTo(User, {
     foreignKey: 'userId'
})

Pedido.belongsToMany(Producto, { through: PedidoProducto });
Producto.belongsToMany(Pedido, {through: PedidoProducto });

export { User, Role, Pedido, Producto, PedidoProducto };

/*
* Usuario relacionado con roles
La tabla de pedido va a tener muchos productos 

pedido a usuario uno a uno (Creo que es uno a Muchos igual que Role y User)
[un pedido puede tener a 1 solo usuario
un usuario puede pertenecer muchos pedidos]

[un usuario puede tener 1 role
un role puede pertenecer a muchos usuarios]

pedido tiene muchos productos 
un producto tiene muchos pedidos
tabla intermedia pedido con pedidos y productos con un controlador ProductosPedidos
https://sequelize.org/docs/v6/core-concepts/assocs/
https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances

*/

