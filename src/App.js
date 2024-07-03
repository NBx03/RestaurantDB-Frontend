import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from './components/Client/ClientList';
import ClientDetail from './components/Client/ClientDetail';
import ClientForm from './components/Client/ClientForm';
import ClientEdit from './components/Client/ClientEdit';
import ClientDelete from './components/Client/ClientDelete';
import BillList from './components/Bill/BillList';
import BillDetail from './components/Bill/BillDetail';
import BillForm from './components/Bill/BillForm';
import BillEdit from './components/Bill/BillEdit';
import BillDelete from './components/Bill/BillDelete';
import DiningTableList from './components/DiningTable/DiningTableList';
import DiningTableDetail from './components/DiningTable/DiningTableDetail';
import DiningTableForm from './components/DiningTable/DiningTableForm';
import DiningTableEdit from './components/DiningTable/DiningTableEdit';
import DiningTableDelete from './components/DiningTable/DiningTableDelete';
import DishList from './components/Dish/DishList';
import DishDetail from './components/Dish/DishDetail';
import DishForm from './components/Dish/DishForm';
import DishEdit from './components/Dish/DishEdit';
import DishDelete from './components/Dish/DishDelete';
import IngredientList from './components/Ingredient/IngredientList';
import IngredientDetail from './components/Ingredient/IngredientDetail';
import IngredientForm from './components/Ingredient/IngredientForm';
import IngredientEdit from './components/Ingredient/IngredientEdit';
import IngredientDelete from './components/Ingredient/IngredientDelete';
import MenuList from './components/Menu/MenuList';
import MenuDetail from './components/Menu/MenuDetail';
import MenuForm from './components/Menu/MenuForm';
import MenuEdit from './components/Menu/MenuEdit';
import MenuDelete from './components/Menu/MenuDelete';
import RecipeList from './components/Recipe/RecipeList';
import RecipeDetail from './components/Recipe/RecipeDetail';
import RecipeForm from './components/Recipe/RecipeForm';
import RecipeEdit from './components/Recipe/RecipeEdit';
import RecipeDelete from './components/Recipe/RecipeDelete';
import RestaurantOrderList from './components/RestaurantOrder/RestaurantOrderList';
import RestaurantOrderDetail from './components/RestaurantOrder/RestaurantOrderDetail';
import RestaurantOrderForm from './components/RestaurantOrder/RestaurantOrderForm';
import RestaurantOrderEdit from './components/RestaurantOrder/RestaurantOrderEdit';
import RestaurantOrderDelete from './components/RestaurantOrder/RestaurantOrderDelete';
import WaiterList from './components/Waiter/WaiterList';
import WaiterDetail from './components/Waiter/WaiterDetail';
import WaiterForm from './components/Waiter/WaiterForm';
import WaiterEdit from './components/Waiter/WaiterEdit';
import WaiterDelete from './components/Waiter/WaiterDelete';
import SupplierList from './components/Supplier/SupplierList';
import SupplierDetail from './components/Supplier/SupplierDetail';
import SupplierForm from './components/Supplier/SupplierForm';
import SupplierEdit from './components/Supplier/SupplierEdit';
import SupplierDelete from './components/Supplier/SupplierDelete';
import Home from './components/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/clients" element={<ClientList />} />
                <Route path="/clients/new" element={<ClientForm />} />
                <Route path="/clients/:id" element={<ClientDetail />} />
                <Route path="/clients/:id/edit" element={<ClientEdit />} />
                <Route path="/clients/:id/delete" element={<ClientDelete />} />
                <Route path="/bills" element={<BillList />} />
                <Route path="/bills/new" element={<BillForm />} />
                <Route path="/bills/:id" element={<BillDetail />} />
                <Route path="/bills/:id/edit" element={<BillEdit />} />
                <Route path="/bills/:id/delete" element={<BillDelete />} />
                <Route path="/dining-tables" element={<DiningTableList />} />
                <Route path="/dining-tables/new" element={<DiningTableForm />} />
                <Route path="/dining-tables/:id" element={<DiningTableDetail />} />
                <Route path="/dining-tables/:id/edit" element={<DiningTableEdit />} />
                <Route path="/dining-tables/:id/delete" element={<DiningTableDelete />} />
                <Route path="/dishes" element={<DishList />} />
                <Route path="/dishes/new" element={<DishForm />} />
                <Route path="/dishes/:id" element={<DishDetail />} />
                <Route path="/dishes/:id/edit" element={<DishEdit />} />
                <Route path="/dishes/:id/delete" element={<DishDelete />} />
                <Route path="/ingredients" element={<IngredientList />} />
                <Route path="/ingredients/new" element={<IngredientForm />} />
                <Route path="/ingredients/:id" element={<IngredientDetail />} />
                <Route path="/ingredients/:id/edit" element={<IngredientEdit />} />
                <Route path="/ingredients/:id/delete" element={<IngredientDelete />} />
                <Route path="/menus" element={<MenuList />} />
                <Route path="/menus/new" element={<MenuForm />} />
                <Route path="/menus/:id" element={<MenuDetail />} />
                <Route path="/menus/:id/edit" element={<MenuEdit />} />
                <Route path="/menus/:id/delete" element={<MenuDelete />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/recipes/new" element={<RecipeForm />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
                <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
                <Route path="/recipes/:id/delete" element={<RecipeDelete />} />
                <Route path="/orders" element={<RestaurantOrderList />} />
                <Route path="/orders/new" element={<RestaurantOrderForm />} />
                <Route path="/orders/:id" element={<RestaurantOrderDetail />} />
                <Route path="/orders/:id/edit" element={<RestaurantOrderEdit />} />
                <Route path="/orders/:id/delete" element={<RestaurantOrderDelete />} />
                <Route path="/waiters" element={<WaiterList />} />
                <Route path="/waiters/new" element={<WaiterForm />} />
                <Route path="/waiters/:id" element={<WaiterDetail />} />
                <Route path="/waiters/:id/edit" element={<WaiterEdit />} />
                <Route path="/waiters/:id/delete" element={<WaiterDelete />} />
                <Route path="/suppliers" element={<SupplierList />} />
                <Route path="/suppliers/new" element={<SupplierForm />} />
                <Route path="/suppliers/:id" element={<SupplierDetail />} />
                <Route path="/suppliers/:id/edit" element={<SupplierEdit />} />
                <Route path="/suppliers/:id/delete" element={<SupplierDelete />} />
            </Routes>
        </Router>
    );
};

export default App;
