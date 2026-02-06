"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  Plus,
  Edit,
  Trash2,
  Upload,
  Eye,
  BarChart3,
  TrendingUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { products } from "@/lib/products";

// TODO: Add Firebase Admin auth check

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Tab = "products" | "orders" | "analytics";

interface MockOrder {
  id: string;
  customer: string;
  products: string;
  total: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const mockOrders: MockOrder[] = [
  {
    id: "RBD-001",
    customer: "sarah.m@email.com",
    products: "Emergency Home Binder",
    total: "$32.99",
    status: "Completed",
    date: "Jan 15, 2026",
  },
  {
    id: "RBD-002",
    customer: "marcus.j@email.com",
    products: "House Hacking Workbook + Landlording for Beginners",
    total: "$59.98",
    status: "Completed",
    date: "Jan 14, 2026",
  },
  {
    id: "RBD-003",
    customer: "lisa.t@email.com",
    products: "Generational Wealth Vol 1 + Vol 3",
    total: "$59.98",
    status: "Completed",
    date: "Jan 13, 2026",
  },
  {
    id: "RBD-004",
    customer: "david.r@email.com",
    products: "First-Time Homebuyer Vol 1",
    total: "$29.99",
    status: "Completed",
    date: "Jan 12, 2026",
  },
  {
    id: "RBD-005",
    customer: "anna.k@email.com",
    products: "New Homeowner Starter Kit",
    total: "$29.99",
    status: "Pending",
    date: "Jan 11, 2026",
  },
];

/* ------------------------------------------------------------------ */
/*  Stat Card Component                                                */
/* ------------------------------------------------------------------ */

function StatCard({
  title,
  value,
  icon: Icon,
  bgColor,
  iconColor,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", bgColor)}>
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Status Badge                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: "Completed" | "Pending" | "Failed" | "Active" }) {
  const styles = {
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Failed: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Category Badge                                                     */
/* ------------------------------------------------------------------ */

function CategoryBadge({ category }: { category: string }) {
  const styles: Record<string, string> = {
    "Wealth Building": "bg-blue-50 text-blue-700 border-blue-200",
    "Real Estate": "bg-purple-50 text-purple-700 border-purple-200",
    Homebuying: "bg-teal-50 text-teal-700 border-teal-200",
    "Emergency Planning": "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[category] || "bg-slate-50 text-slate-700 border-slate-200"
      )}
    >
      {category}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Add Product Form                                                   */
/* ------------------------------------------------------------------ */

function AddProductForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    originalPrice: "",
    category: "Wealth Building",
    description: "",
    longDescription: "",
    includes: "",
    fileFormat: "PDF",
    featured: false,
    bestseller: false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Integrate with Firebase to save product
    console.log("New product data:", {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      includes: formData.includes.split("\n").filter(Boolean),
      fileFormat: formData.fileFormat.split(",").map((f) => f.trim()),
    });
    alert("Product logged to console. Firebase integration coming soon!");
    onClose();
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Add New Product</h3>
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="e.g., Generational Wealth Volume 4"
            />
          </div>

          {/* Slug */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="e.g., generational-wealth-volume-4"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="29.99"
            />
          </div>

          {/* Original Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Original Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.originalPrice}
              onChange={(e) =>
                setFormData({ ...formData, originalPrice: e.target.value })
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="39.99"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="Wealth Building">Wealth Building</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Homebuying">Homebuying</option>
              <option value="Emergency Planning">Emergency Planning</option>
            </select>
          </div>

          {/* File Format */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              File Format
            </label>
            <input
              type="text"
              value={formData.fileFormat}
              onChange={(e) =>
                setFormData({ ...formData, fileFormat: e.target.value })
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="PDF, Excel, Word"
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Short Description
            </label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="A brief description of the product"
            />
          </div>

          {/* Long Description */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Long Description
            </label>
            <textarea
              rows={3}
              value={formData.longDescription}
              onChange={(e) =>
                setFormData({ ...formData, longDescription: e.target.value })
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Detailed description of the product..."
            />
          </div>

          {/* Includes */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Includes (one per line)
            </label>
            <textarea
              rows={3}
              value={formData.includes}
              onChange={(e) =>
                setFormData({ ...formData, includes: e.target.value })
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder={"Budget templates\nGoal worksheets\nFinancial planners"}
            />
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-6 sm:col-span-2">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={formData.bestseller}
                onChange={(e) =>
                  setFormData({ ...formData, bestseller: e.target.checked })
                }
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
              />
              Bestseller
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Save Product
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Products Tab                                                       */
/* ------------------------------------------------------------------ */

function ProductsTab() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Manage Products</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New Product
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && <AddProductForm onClose={() => setShowForm(false)} />}

      {/* Products Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Image
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Name
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Price
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {/* Image */}
                  <td className="px-6 py-4">
                    <div className="h-12 w-12 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                      <Image
                        src={product.coverImage}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {product.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {product.slug}
                      </p>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <CategoryBadge category={product.category} />
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-semibold text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-slate-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge status="Active" />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          // TODO: Implement view product
                          window.open(`/shop/${product.slug}`, "_blank");
                        }}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          // TODO: Implement edit product with Firebase
                          console.log("Edit product:", product.id);
                        }}
                        className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          // TODO: Implement delete product with Firebase
                          console.log("Delete product:", product.id);
                        }}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="border-t border-slate-200 bg-slate-50/80 px-6 py-3">
          <p className="text-xs text-slate-500">
            Showing {products.length} of {products.length} products
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Orders Tab                                                         */
/* ------------------------------------------------------------------ */

function OrdersTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Recent Orders</h2>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Order #
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Customer
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Products
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-900">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {order.customer}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="max-w-xs truncate text-sm text-slate-600 block">
                      {order.products}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-900">
                      {order.total}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{order.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="border-t border-slate-200 bg-slate-50/80 px-6 py-3">
          <p className="text-xs text-slate-500">
            Showing {mockOrders.length} recent orders
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Analytics Tab                                                      */
/* ------------------------------------------------------------------ */

function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Analytics Overview</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Revenue This Month */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Revenue This Month
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                $1,245.00
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-xs font-medium text-emerald-600">+12.5%</span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>

        {/* Orders This Month */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Orders This Month
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900">42</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-xs font-medium text-emerald-600">+8.2%</span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>

        {/* Top Product */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Top Product</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                Emergency Home Binder
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xs text-slate-500">
              428 reviews &middot; 4.9 rating
            </span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Conversion Rate
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900">3.2%</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-xs font-medium text-emerald-600">+0.4%</span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>
      </div>

      {/* Placeholder for future charts */}
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
        <BarChart3 className="mx-auto h-12 w-12 text-slate-300" />
        <p className="mt-4 text-sm font-medium text-slate-500">
          Full analytics dashboard coming soon
        </p>
        <p className="mt-1 text-xs text-slate-400">
          {/* // Full analytics dashboard coming soon - will integrate with Stripe Dashboard */}
          Will integrate with Stripe Dashboard for detailed revenue charts,
          customer insights, and product performance metrics.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Admin Dashboard                                               */
/* ------------------------------------------------------------------ */

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("products");

  const tabs: { id: Tab; label: string }[] = [
    { id: "products", label: "Products" },
    { id: "orders", label: "Orders" },
    { id: "analytics", label: "Analytics" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Admin Dashboard
              </h1>
              <p className="text-xs text-slate-500">Rubi Digital Downloads</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-slate-500 sm:block">
                {/* // TODO: Add Firebase Admin auth check */}
                admin@rubidigitaldownloads.com
              </span>
              <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-xs font-bold text-white">JV</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Products"
            value={products.length}
            icon={Package}
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Total Orders"
            value={156}
            icon={ShoppingCart}
            bgColor="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <StatCard
            title="Revenue"
            value="$4,543.44"
            icon={DollarSign}
            bgColor="bg-orange-50"
            iconColor="text-orange-600"
          />
          <StatCard
            title="Customers"
            value={89}
            icon={Users}
            bgColor="bg-purple-50"
            iconColor="text-purple-600"
          />
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-slate-200">
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative pb-3 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-slate-900" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "products" && <ProductsTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
        </div>
      </div>
    </div>
  );
}
