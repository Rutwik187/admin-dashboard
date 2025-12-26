"use client";

import { useState } from "react";

import { Plus, Lock, Edit, Trash2 } from "lucide-react";

import { UnitIcon, type UnitType } from "@/components/inventory/unit-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RecipeIngredient {
  id: string;
  name: string;
  quantity: number;
  unit: UnitType;
}

interface Recipe {
  id: string;
  name: string;
  batchSize: number;
  ingredients: RecipeIngredient[];
  isLocked: boolean;
}

const sampleRecipes: Recipe[] = [
  {
    id: "1",
    name: "Black Forest Cake",
    batchSize: 50,
    isLocked: true,
    ingredients: [
      { id: "1", name: "Flour", quantity: 5, unit: "weight" },
      { id: "2", name: "Sugar", quantity: 3, unit: "weight" },
      { id: "3", name: "Butter", quantity: 2, unit: "package" },
      { id: "4", name: "Cream", quantity: 4, unit: "volume" },
      { id: "5", name: "Eggs", quantity: 20, unit: "count" },
    ],
  },
  {
    id: "2",
    name: "Chocolate Cake",
    batchSize: 30,
    isLocked: true,
    ingredients: [
      { id: "1", name: "Flour", quantity: 3, unit: "weight" },
      { id: "2", name: "Sugar", quantity: 2, unit: "weight" },
      { id: "3", name: "Cocoa Powder", quantity: 1, unit: "weight" },
      { id: "4", name: "Milk", quantity: 2, unit: "volume" },
    ],
  },
];

export default function RecipeLockdownPage() {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const toggleLock = (id: string) => {
    setRecipes(recipes.map((recipe) => (recipe.id === id ? { ...recipe, isLocked: !recipe.isLocked } : recipe)));
  };

  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Recipe Lockdown</h1>
        <p className="text-muted-foreground">
          Define "Gold Standard" recipes once. Lock them to prevent changes and ensure consistency
        </p>
      </div>

      {/* Recipe List */}
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{recipe.name}</CardTitle>
                {recipe.isLocked && (
                  <Badge variant="outline" className="gap-1">
                    <Lock className="size-3" />
                    Locked
                  </Badge>
                )}
              </div>
              <CardDescription>Batch Size: {recipe.batchSize} units</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Ingredients Required:</p>
                <div className="space-y-1">
                  {recipe.ingredients.map((ing) => (
                    <div key={ing.id} className="flex items-center gap-2 text-sm">
                      <UnitIcon type={ing.unit} size={16} />
                      <span>
                        {ing.name}: {ing.quantity} {ing.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => toggleLock(recipe.id)} className="flex-1">
                  {recipe.isLocked ? "Unlock" : "Lock"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedRecipe(recipe)} className="flex-1">
                  <Edit className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Recipe Button */}
      <Card>
        <CardContent className="pt-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" size="lg">
                <Plus className="mr-2 size-4" />
                Create New Recipe
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Recipe</DialogTitle>
                <DialogDescription>
                  Define the "Gold Standard" recipe. Once locked, it cannot be changed.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Recipe Name</Label>
                  <Input placeholder="e.g., Black Forest Cake" />
                </div>
                <div>
                  <Label>Batch Size</Label>
                  <Input type="number" placeholder="50" />
                </div>
                <div>
                  <Label>Ingredients</Label>
                  <p className="text-muted-foreground mb-2 text-sm">Add ingredients and their required quantities</p>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 size-4" />
                    Add Ingredient
                  </Button>
                </div>
                <Button className="w-full">Create & Lock Recipe</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
