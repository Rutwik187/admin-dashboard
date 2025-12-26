"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, Package, ChefHat } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/inventory/status-indicator";
import { UnitIcon, type UnitType } from "@/components/inventory/unit-icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RecipeIngredient {
  id: string;
  name: string;
  requiredQty: number;
  availableQty: number;
  unit: UnitType;
  status: "ok" | "low" | "insufficient";
}

interface ProductionBatch {
  recipeId: string;
  recipeName: string;
  batchSize: number;
  ingredients: RecipeIngredient[];
}

const availableRecipes = [
  {
    id: "1",
    name: "Black Forest Cake",
    batchSize: 50,
    ingredients: [
      { id: "1", name: "Flour", requiredQty: 5, availableQty: 10, unit: "weight" as UnitType, status: "ok" as const },
      { id: "2", name: "Sugar", requiredQty: 3, availableQty: 2, unit: "weight" as UnitType, status: "insufficient" as const },
      { id: "3", name: "Butter", requiredQty: 2, availableQty: 5, unit: "package" as UnitType, status: "ok" as const },
      { id: "4", name: "Cream", requiredQty: 4, availableQty: 6, unit: "volume" as UnitType, status: "ok" as const },
      { id: "5", name: "Eggs", requiredQty: 20, availableQty: 30, unit: "count" as UnitType, status: "ok" as const },
    ],
  },
  {
    id: "2",
    name: "Chocolate Cake",
    batchSize: 30,
    ingredients: [
      { id: "1", name: "Flour", requiredQty: 3, availableQty: 10, unit: "weight" as UnitType, status: "ok" as const },
      { id: "2", name: "Sugar", requiredQty: 2, availableQty: 2, unit: "weight" as UnitType, status: "low" as const },
      { id: "3", name: "Cocoa Powder", requiredQty: 1, availableQty: 3, unit: "weight" as UnitType, status: "ok" as const },
      { id: "4", name: "Milk", requiredQty: 2, availableQty: 5, unit: "volume" as UnitType, status: "ok" as const },
    ],
  },
];

export default function OneTapProductionPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<string>("");
  const [finishedQty, setFinishedQty] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentRecipe = availableRecipes.find((r) => r.id === selectedRecipe);
  const canProduce = currentRecipe?.ingredients.every((ing) => ing.status !== "insufficient") ?? false;
  const hasInsufficient = currentRecipe?.ingredients.some((ing) => ing.status === "insufficient") ?? false;

  const handleFinish = () => {
    if (currentRecipe && finishedQty > 0 && canProduce) {
      // Auto-deduct ingredients
      console.log(`Deducting ingredients for ${finishedQty} ${currentRecipe.name}`);
      setIsCompleted(true);
      // In real app, update inventory
    }
  };

  const handleYieldCheck = () => {
    if (currentRecipe && finishedQty > 0) {
      const expectedYield = currentRecipe.batchSize;
      if (finishedQty < expectedYield * 0.9) {
        alert("Yield Error: Expected ~" + expectedYield + " but got " + finishedQty + ". Check for spillage or theft!");
      } else {
        alert("Yield OK!");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 @container">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">One-Tap Production</h1>
        <p className="text-muted-foreground">
          Select recipe, see required ingredients, tap "Finished" to auto-deduct stock
        </p>
      </div>

      {/* Recipe Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="size-5" />
            Select Recipe
          </CardTitle>
          <CardDescription>Choose the recipe you're about to produce</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedRecipe} onValueChange={setSelectedRecipe}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a recipe..." />
            </SelectTrigger>
            <SelectContent>
              {availableRecipes.map((recipe) => (
                <SelectItem key={recipe.id} value={recipe.id}>
                  {recipe.name} (Batch: {recipe.batchSize})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Ingredients Display */}
      {currentRecipe && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Required Ingredients</CardTitle>
              <CardDescription>
                Take these exact quantities from inventory for this batch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentRecipe.ingredients.map((ing) => (
                  <div
                    key={ing.id}
                    className={`flex items-center justify-between rounded-lg border p-4 ${
                      ing.status === "insufficient"
                        ? "border-red-500/50 bg-red-500/5"
                        : ing.status === "low"
                          ? "border-orange-500/50 bg-orange-500/5"
                          : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <UnitIcon type={ing.unit} size={24} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{ing.name}</span>
                          {ing.status === "insufficient" && (
                            <Badge variant="destructive" className="animate-pulse">
                              Insufficient
                            </Badge>
                          )}
                          {ing.status === "low" && (
                            <Badge variant="outline" className="border-orange-500 text-orange-600">
                              Low
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Required: {ing.requiredQty} | Available: {ing.availableQty}
                        </p>
                      </div>
                    </div>
                    <StatusIndicator
                      status={
                        ing.status === "insufficient"
                          ? "critical"
                          : ing.status === "low"
                            ? "action-needed"
                            : "completed"
                      }
                    />
                  </div>
                ))}
              </div>

              {hasInsufficient && (
                <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/5 p-4">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertTriangle className="size-5" />
                    <span className="font-medium">Cannot produce: Insufficient ingredients</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Production Completion */}
          {canProduce && (
            <Card>
              <CardHeader>
                <CardTitle>Complete Production</CardTitle>
                <CardDescription>Enter finished quantity and tap "Finished"</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Finished Quantity</Label>
                  <Input
                    type="number"
                    value={finishedQty || ""}
                    onChange={(e) => setFinishedQty(Number(e.target.value))}
                    placeholder={`Expected: ${currentRecipe.batchSize}`}
                    min={0}
                    className="mt-1 text-lg"
                  />
                  <p className="mt-1 text-sm text-muted-foreground">
                    Expected batch size: {currentRecipe.batchSize} units
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleYieldCheck}
                    disabled={finishedQty === 0}
                    className="flex-1"
                  >
                    Check Yield
                  </Button>
                  <Button
                    onClick={handleFinish}
                    disabled={finishedQty === 0}
                    className="flex-1"
                    size="lg"
                  >
                    <Package className="mr-2 size-4" />
                    Finished {finishedQty > 0 ? finishedQty : ""} {finishedQty > 0 ? "Cakes" : ""}
                  </Button>
                </div>

                {isCompleted && (
                  <div className="rounded-lg border border-green-500/50 bg-green-500/5 p-4">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="size-5" />
                      <span className="font-medium">
                        Production completed! Ingredients deducted from inventory. Finished goods added.
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}


