import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Modal, Button } from "react-bootstrap";

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
  const [showModal, setShowModal] = useState(false);

  const skillCategories = ["Art", "Design", "Development", "Marketing", "Music", "Photography", "Video", "Writing", "Other"];
  const skillSubcategories = ["Graphic Design", "Illustration", "Motion Graphics", "Web Design", "UX/UI", "Frontend", "Backend", "Fullstack", "Mobile", "SEO", "Social Media", "Email Marketing", "Copywriting", "Songwriting", "Composing", "Production", "Mixing/Mastering", "Photography", "Video Editing", "Screenwriting", "Blogging", "Ghostwriting", "Other"];

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/users/${store.auth.user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData({
          name: data.name || "",
          last_name: data.last_name || "",
          description: data.description || "",
          profile_pic_src: data.profile_pic_src || "",
        });
        if (data.skills) {
          const lookingForSkill = data.skills.find((skill) => skill.skill_type === "Looking For") || { id: null, skill_category: "", skill_subcategory: "" };
          const offeringSkill = data.skills.find((skill) => skill.skill_type === "Offering") || { id: null, skill_category: "", skill_subcategory: "" };
          setSkills({ lookingFor: lookingForSkill, offering: offeringSkill });
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [store.auth.user.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.secure_url) {
        setFormData((prevData) => ({ ...prevData, profile_pic_src: result.secure_url }));
      } else {
        throw new Error("Error al subir la imagen");
      }
    } catch (err) {
      console.error(err);
      setError(err);
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.BACKEND_URL}/api/users/${store.auth.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, skills }),
      });

      setUser({ ...user, ...formData, skills });
      setShowModal(false);
      alert("Perfil actualizado exitosamente");
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando usuario...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error.message}</p>;

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-3 w-100" style={{ backgroundColor: "#FBECE5" }}>
            <div className="row">
              <div className="col-md-4 text-center">
                <img src={user.profile_pic_src || "https://archive.org/download/placeholder-image/placeholder-image.jpg"} alt="Perfil" className="img-fluid rounded-circle" style={{ width: "150px", height: "150px", objectFit: "cover" }} />
              </div>
              <div className="col-md-8">
                <h3 className="fw-bold">{user.name} {user.last_name}</h3>
                <p>{user.description || "No hay descripción disponible"}</p>
                <p><strong>Email:</strong> {user.email || "No disponible"}</p>
                <div className="text-center mt-4">
                  <button className="btn btn-dark shadow" onClick={() => setShowModal(true)}>Editar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <label className="my-3">Foto de Perfil</label>
            <input type="file" className="form-control" onChange={handleFileChange} />
            {uploading && <p>Subiendo imagen...</p>}
            {formData.profile_pic_src && <img src={formData.profile_pic_src} alt="Perfil" className="img-thumbnail mt-2" style={{ maxWidth: "150px" }} />}
            <label className="my-3">
            Nombre
          </label>
            <input type="text" className="form-control " name="name" value={formData.name} onChange={handleInputChange} placeholder="Nombre" />
            
            <div className="mb-3">
          <label className="my-3">
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
        <label>
            Descripción
          </label>
        <textarea className="form-control my-3" name="description" rows="3" value={formData.description} onChange={handleInputChange} placeholder="Descripción"></textarea>

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


            <Button type="submit" variant="primary" className="mt-3">Guardar cambios</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
