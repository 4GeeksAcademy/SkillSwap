import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

export const MyAccount = () => {
  const { store } = useContext(Context);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    description: "",
    profile_pic_src: "",
  });

  const [skills, setSkills] = useState({
    lookingFor: { id: null, skill_category: "", skill_subcategory: "" },
    offering: { id: null, skill_category: "", skill_subcategory: "" },
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const skillCategories = [
    "Art",
    "Design",
    "Development",
    "Marketing",
    "Music",
    "Photography",
    "Video",
    "Writing",
    "Other",
  ];
  const skillSubcategories = [
    "Graphic Design",
    "Illustration",
    "Motion Graphics",
    "Web Design",
    "UX/UI",
    "Frontend",
    "Backend",
    "Fullstack",
    "Mobile",
    "SEO",
    "Social Media",
    "Email Marketing",
    "Copywriting",
    "Songwriting",
    "Composing",
    "Production",
    "Mixing/Mastering",
    "Photography",
    "Video Editing",
    "Screenwriting",
    "Blogging",
    "Ghostwriting",
    "Other",
  ];

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/users/${store.auth.user.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener la información del usuario");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setFormData({
          name: data.name || "",
          last_name: data.last_name || "",
          description: data.description || "",
          profile_pic_src: data.profile_pic_src || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [store.auth.user.id]);

  useEffect(() => {
    if (user && user.skills) {
      const lookingForSkill =
        user.skills.find((skill) => skill.skill_type === "Looking For") || {
          id: null,
          skill_category: "",
          skill_subcategory: "",
        };
      const offeringSkill =
        user.skills.find((skill) => skill.skill_type === "Offering") || {
          id: null,
          skill_category: "",
          skill_subcategory: "",
        };
      setSkills({ lookingFor: lookingForSkill, offering: offeringSkill });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillChange = (type, field, value) => {
    setSkills((prevSkills) => ({
      ...prevSkills,
      [type]: { ...prevSkills[type], [field]: value },
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME);
    data.append("folder", "SkillSwap");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      if (result.secure_url) {
        setFormData((prevData) => ({
          ...prevData,
          profile_pic_src: result.secure_url,
        }));
      } else {
        throw new Error("Error al subir la imagen");
      }
    } catch (err) {
      console.error(err);
      setError(err);
    }
    setUploading(false);
  };

  const updateSkill = async (skillData, skillType) => {
    if (skillData.id) {
      const res = await fetch(
        `${process.env.BACKEND_URL}/skills/${skillData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            skill_category: skillData.skill_category,
            skill_subcategory: skillData.skill_subcategory,
          }),
        }
      );
      if (!res.ok) {
        throw new Error(`Error al actualizar la skill ${skillType}`);
      }
      return await res.json();
    } else {
      const res = await fetch(`${process.env.BACKEND_URL}/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: store.auth.user.id,
          skill_type: skillType,
          skill_category: skillData.skill_category,
          skill_subcategory: skillData.skill_subcategory,
        }),
      });
      if (!res.ok) {
        throw new Error(`Error al crear la skill ${skillType}`);
      }
      return await res.json();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/users/${store.auth.user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) {
        throw new Error("Error al actualizar la información del usuario");
      }
      const updatedUser = await res.json();
      setUser(updatedUser);

      await updateSkill(skills.lookingFor, "Looking For");
      await updateSkill(skills.offering, "Offering");

      alert("Perfil y skills actualizados exitosamente");
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  if (loading) {
    return <div className="container mt-5 text-center">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Tus datos</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="profile_pic" className="form-label">
            Foto de Perfil
          </label>
          <input
            type="file"
            className="form-control"
            id="profile_pic"
            onChange={handleFileChange}
          />
          {uploading && <p>Subiendo imagen...</p>}
          {formData.profile_pic_src && (
            <img
              src={formData.profile_pic_src}
              alt="Foto de perfil"
              className="img-thumbnail mt-2"
              style={{ maxWidth: "200px" }}
            />
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        {/* Sección de skills */}
        <h3>Skill que buscas</h3>
        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select
            value={skills.lookingFor.skill_category}
            onChange={(e) =>
              handleSkillChange("lookingFor", "skill_category", e.target.value)
            }
            className="form-select"
          >
            <option value="">Selecciona una categoría</option>
            {skillCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Subcategoría</label>
          <select
            value={skills.lookingFor.skill_subcategory}
            onChange={(e) =>
              handleSkillChange("lookingFor", "skill_subcategory", e.target.value)
            }
            className="form-select"
          >
            <option value="">Selecciona una subcategoría</option>
            {skillSubcategories.map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>
        <h3>Skill que ofreces</h3>
        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select
            value={skills.offering.skill_category}
            onChange={(e) =>
              handleSkillChange("offering", "skill_category", e.target.value)
            }
            className="form-select"
          >
            <option value="">Selecciona una categoría</option>
            {skillCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Subcategoría</label>
          <select
            value={skills.offering.skill_subcategory}
            onChange={(e) =>
              handleSkillChange("offering", "skill_subcategory", e.target.value)
            }
            className="form-select"
          >
            <option value="">Selecciona una subcategoría</option>
            {skillSubcategories.map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};
