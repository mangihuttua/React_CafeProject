import { useEffect, useState } from "react";
import { getMenus, createMenu, updateMenu, deleteMenu} from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function AdminMenu() {
  const { token } = useAuth();
 
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({}); // State untuk menyimpan pesan error masing -masing input 
  const [error, setError] = useState("");  // State untuk menyimpan pesan error dari server/API   
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));

    setErrors((prev) => ({
        ...prev,
        [name]: "",
    }));
    };

  
    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Nama menu wajib diisi.";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Deskripsi menu wajib diisi.";
        }

        const price = Number(formData.price);

        if (
            formData.price === "" ||
            !Number.isFinite(price) ||
            price <= 0
        ) {
            newErrors.price = "Harga harus lebih dari 0.";
        }

        if (!formData.category) {
            newErrors.category = "Kategori wajib dipilih.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


   

  const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Jalankan validasi
        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        setSaving(true);

        try {
            const menuData = new FormData();

            menuData.append("title", formData.title.trim());
            menuData.append("description", formData.description.trim());
            menuData.append("price", String(Number(formData.price)));
            menuData.append("category", formData.category.trim());

            if (formData.image instanceof File) {
                menuData.append("image", formData.image);
            }

            if (editingId === null) {
                await createMenu(menuData, token);
                setSuccess("Menu berhasil ditambahkan!");
            } else {
                await updateMenu(editingId, menuData, token);
                setSuccess("Menu berhasil diperbarui!");
            }

            setFormData({
                title: "",
                description: "",
                price: "",
                category: "",
                image: "",
            });

            setErrors({});
            setEditingId(null);
            setShowForm(false);

            const data = await getMenus();
            setMenus(data);

        } catch (err) {
            setError(err.message || "Gagal menyimpan menu.");
        } finally {
            setSaving(false);
        }
    };


  const handleImageChange = (e) => {
  const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({
        ...prev,
        image: file,
    }));
    };
  
  const handleEdit = (menu) => {
        setEditingId(menu.id);

        setFormData({
            title: menu.title || "",
            description: menu.description || "",
            price: menu.price || "",
            category: menu.category || "",
            image: menu.image || "",
        });

        setShowForm(true);
        setError("");
        setSuccess("");
        };
  const handleDelete = async (menu) => {
  const confirmed = window.confirm(
            `Apakah kamu yakin ingin menghapus menu "${menu.title}"?`
        );

        if (!confirmed) {
            return;
        }

        setError("");
        setSuccess("");

        try {
            await deleteMenu(menu.id, token);

            setSuccess(`Menu "${menu.title}" berhasil dihapus!`);

            const data = await getMenus();
            setMenus(data);
        } catch (err) {
            setError(err.message || "Gagal menghapus menu");
        }
        };

  const [editingId, setEditingId] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await getMenus();
        setMenus(data);
      } catch (err) {
        setError(err.message || "Gagal mengambil data menu");
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading menu...</p>
      </div>
    );
  }


  
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-amber-900">
            Menu Management
          </h1>

          <p className="mt-1 text-gray-500">
            Kelola daftar menu Cafe Delight.
          </p>
        </div>

        <button className="rounded-lg bg-orange-800 px-4 py-2 text-white font-bold hover:bg-orange-900"
                onClick={() => {
                            setShowForm(true);
                            setError("");
                            setSuccess("");
                        }}
        >
          + Add Menu
        </button>
        </div>
       
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full text-left">
        <thead className="bg-amber-100 text-amber-900">
            <tr>
            <th className="p-4">No</th>
            <th className="p-4">Gambar</th>
            <th className="p-4">Menu</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Action</th>
            </tr>
        </thead>

        <tbody>
            {/* SUCCESS MESSAGE */}
            {success && (
            <tr>
                <td colSpan={5} className="p-4">
                <p className="rounded-lg bg-green-100 p-3 text-green-700">
                    {success}
                </p>
                </td>
            </tr>
            )}

            {/* FORM ADD MENU */}
            {showForm && (
            <tr>
                <td colSpan={5} className="p-6">

                <div className="w-full rounded-xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-bold text-amber-900">
                          {editingId === null ? "Add New Menu" : "Edit Menu"}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid w-full grid-cols-1 gap-4 md:grid-cols-2" noValidate >
                    <div>
                        <label className="mb-1 block font-medium"> Menu Name </label>

                        <input type="text" name="title" value={formData.title} onChange={handleChange} 
                                placeholder="contoh: Vanilla Latte"/>
                            {errors.title && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.title}
                            </p>
                            )}
                    </div>

                    <div>
                        <label className="mb-1 block font-medium"> Price </label>

                        <input type="number" name="price" value={formData.price}onChange={handleChange} min="1" required
                               className={`w-full rounded-lg border p-3 ${errors.price ? "border-red-500" : "border-gray-300"}`}
                               placeholder="contoh: 35000"/>
                        {errors.price && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.price}
                        </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block font-medium"> Category </label>

                       <select name="category"
                               value={formData.category}
                               onChange={handleChange}
                               className={`w-full rounded-lg border p-3 ${errors.category ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Pilih Kategori</option>
                            <option value="Coffee">Coffee</option>
                            <option value="Pastry">Pastry</option>
                            <option value="Dessert">Dessert</option>
                        </select>
                        {errors.category && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.category}
                        </p>
                        )}
                    </div>

                    <div>
                    <label className="mb-1 block font-medium"> Image </label>

                    <input type="file" name="image" accept="image/png,image/jpeg,image/jpg"
                           onChange={handleImageChange}
                           className={`w-full rounded-lg border p-3 ${errors.image ? "border-red-500" : "border-gray-300"}
                                      file:rounded-lg file:bg-amber-100 file:px-4 file:py-2
                                    file:text-amber-900 hover:file:bg-amber-200 file:font-sans`}
                    />
                    {formData.image instanceof File && (
                        <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview menu"
                        className="mt-3 h-32 w-32 rounded-lg object-cover"
                        />
                    )}

                    <p className="mt-1 text-sm text-gray-500">
                        Format yang didukung: PNG, JPG, JPEG.
                    </p>
                    
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1 block font-medium"> Description </label>

                        <textarea name="description" value={formData.description} onChange={handleChange} required
                                  rows={4} className={`w-full rounded-lg border p-3 ${errors.description ? "border-red-500" : "border-gray-300"}`} placeholder="Deskripsi menu"
                        />
                        {errors.description && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.description}
                        </p>
                        )}
                    </div>

                    <div className="flex gap-3 md:col-span-2">
                        <button type="submit" disabled={saving}
                                className="rounded-lg bg-orange-800 px-5 py-2 text-white disabled:opacity-50" >
                        {saving ? "Saving..." : editingId === null ? "Save Menu" : "Update Menu"}
                        </button>

                       <button type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingId(null);

                                    setFormData({
                                    title: "",
                                    description: "",
                                    price: "",
                                    category: "Coffee",
                                    image: "",
                                    });
                                }}
                                className="rounded-lg bg-gray-200 px-5 py-2" >
                            Cancel
                        </button>

                    </div>

                    </form>
                </div>
                </td>
            </tr>
            )}

            {/* DATA MENU */}
            {menus.map((menu, index) => (
            <tr key={menu.id} className="border-b">
                <td className="p-4">{index + 1}</td>

                <td className="p-4">
                <div className="flex items-center gap-3">
                    <img
                    src={
                        menu.image
                        ? `/images/menuImages/${menu.image}`
                        : "/images/menu-placeholder.png"
                    }
                    alt={menu.title}
                    className="h-14 w-14 rounded-lg object-cover"
                    />

                    <div>
                    <div className="font-semibold">{menu.title}</div>
                    <p className="text-sm text-gray-500">
                        {menu.description}
                    </p>
                    </div>
                </div>
                </td>

                <td className="p-4">
                <div className="font-semibold">
                    {menu.title}
                </div>
                <p className="text-sm text-gray-500">
                    {menu.description}
                </p>
                </td>

                <td className="p-4">{menu.category}</td>

                <td className="p-4">
                    Rp {Number(menu.price).toLocaleString("id-ID")}
                </td>

                <td className="p-4">
                <div className="flex gap-4">
                    <button  onClick={() => handleEdit(menu)} className="rounded bg-blue-500 px-3 py-1 text-white">
                        Edit
                    </button>

                    <button onClick={() => handleDelete(menu)} className="rounded bg-red-400 px-3 py-1">
                        Delete
                    </button>
                </div>
                </td>

            </tr>
            ))}

            {menus.length === 0 && (
            <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                Belum ada data menu.
                </td>
            </tr>
            )}

        </tbody>
        </table>

      </div>
    </div>
  );
}
