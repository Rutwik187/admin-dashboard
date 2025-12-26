"use client";

import { useState } from "react";

import { Plus, X, ShoppingBag, CheckCircle2 } from "lucide-react";

import { StatusIndicator } from "@/components/inventory/status-indicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image?: string;
}

// Product data with Unsplash images
const availableProducts = [
  {
    id: "PRD001",
    name: "Black Forest Cake",
    price: 450,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
  },
  {
    id: "PRD002",
    name: "Chocolate Truffle Cake",
    price: 550,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop",
  },
  {
    id: "PRD003",
    name: "Red Velvet Cake",
    price: 500,
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop",
  },
  {
    id: "PRD004",
    name: "Vanilla Sponge Cake",
    price: 350,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop",
  },
  {
    id: "PRD005",
    name: "Strawberry Shortcake",
    price: 400,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop",
  },
  {
    id: "PRD006",
    name: "Chocolate Eclair",
    price: 45,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop",
  },
  {
    id: "PRD007",
    name: "Croissant",
    price: 35,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop",
  },
  {
    id: "PRD008",
    name: "Blueberry Muffin",
    price: 40,
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop",
  },
  {
    id: "PRD009",
    name: "Chocolate Chip Cookie",
    price: 25,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop",
  },
  {
    id: "PRD010",
    name: "White Bread Loaf",
    price: 60,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
  },
  {
    id: "PRD011",
    name: "Vada Pav",
    price: 25,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
  },
  {
    id: "PRD012",
    name: "Samosa",
    price: 20,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70987?w=400&h=400&fit=crop",
  },
];

export default function CreateOrderPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>("");

  const addItem = () => {
    if (selectedProduct && quantity > 0) {
      const product = availableProducts.find((p) => p.id === selectedProduct);
      if (product) {
        const newItem: OrderItem = {
          id: Date.now().toString(),
          productId: product.id,
          productName: product.name,
          quantity,
          price: product.price,
          image: product.image,
        };
        setOrderItems([...orderItems, newItem]);
        setSelectedProduct("");
        setQuantity(1);
      }
    }
  };

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty > 0) {
      setOrderItems(orderItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)));
    }
  };

  const createOrder = () => {
    if (orderItems.length > 0) {
      const newOrderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderNumber(newOrderNumber);
      setOrderCreated(true);
      // In real app, send order to production department
      console.log("Order created:", { orderNumber: newOrderNumber, items: orderItems });
    }
  };

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Order</h1>
        <p className="text-muted-foreground">
          Point of contact order creation. Select products and quantities - no Excel needed
        </p>
      </div>

      {orderCreated ? (
        <Card className="border-green-500/50 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="size-5" />
              Order Created Successfully!
            </CardTitle>
            <CardDescription>Order #{orderNumber} has been sent to Production Department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">Order Summary:</p>
              <div className="space-y-1 text-sm">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.productName} x {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-t pt-2 font-bold">
                <span>Total:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
            <Button
              onClick={() => {
                setOrderCreated(false);
                setOrderItems([]);
                setOrderNumber("");
              }}
              className="w-full"
            >
              Create New Order
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Add Product Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="size-5" />
                Add Products to Order
              </CardTitle>
              <CardDescription>Select product and enter quantity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 @md:grid-cols-2">
                <div>
                  <Label htmlFor="product-select">Select Product</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger id="product-select" className="mt-1 w-full">
                      <SelectValue placeholder="Choose a product..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - ₹{product.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity-input">Quantity</Label>
                  <Input
                    id="quantity-input"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={1}
                    className="mt-1"
                  />
                </div>
              </div>
              <Button onClick={addItem} disabled={!selectedProduct || quantity < 1} className="w-full">
                <Plus className="mr-2 size-4" />
                Add to Order
              </Button>
            </CardContent>
          </Card>

          {/* Order Items */}
          {orderItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
                <CardDescription>
                  {totalItems} item(s) | Total: ₹{totalAmount}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="hover:bg-accent/50 flex items-center gap-4 rounded-lg border p-4 transition-colors"
                    >
                      {item.image && (
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border">
                          <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.productName}</h3>
                        <p className="text-muted-foreground text-sm">₹{item.price} per unit</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{item.price * item.quantity}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={createOrder} size="lg" className="gap-2">
                    <CheckCircle2 className="size-4" />
                    Create Order & Send to Production
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
