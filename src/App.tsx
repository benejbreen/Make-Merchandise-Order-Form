// Enhanced order form allowing multiple garment designs with advanced style/deco selections
import { useState } from "react";

export default function StandardOrderForm() {
  const garmentOptions = ["Shirts", "Hoodies", "Long Sleeves", "Totes", "Hats"];
  const sizeKeys = ["S", "M", "L", "XL", "XXL"];

  const [garments, setGarments] = useState([
    {
      type: "Shirts",
      style: "",
      decoration: "",
      placements: [],
      sizes: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
      artwork: {},
      notes: "",
    },
  ]);

  const addGarment = () => {
    setGarments([
      ...garments,
      {
        type: "Shirts",
        style: "",
        decoration: "",
        placements: [],
        sizes: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
        artwork: {},
        notes: "",
      },
    ]);
  };

  const handleSizeChange = (index, name, value) => {
    const updated = [...garments];
    updated[index].sizes[name] = parseInt(value || "0", 10);
    setGarments(updated);
  };

  const handleGarmentTypeChange = (index, value) => {
    const updated = [...garments];
    updated[index].type = value;
    updated[index].style = "";
    setGarments(updated);
  };

  const handleStyleChange = (index, value) => {
    const updated = [...garments];
    updated[index].style = value;
    setGarments(updated);
  };

  const handleDecorationChange = (index, value) => {
    const updated = [...garments];
    updated[index].decoration = value;
    setGarments(updated);
  };

  const handlePlacementsChange = (index, placement) => {
    const updated = [...garments];
    const current = updated[index].placements;
    updated[index].placements = current.includes(placement)
      ? current.filter((p) => p !== placement)
      : [...current, placement];
    setGarments(updated);
  };

  const handleArtworkChange = (index, placement, file) => {
    const updated = [...garments];
    updated[index].artwork[placement] = file;
    setGarments(updated);
  };

  const handleNotesChange = (index, value) => {
    const updated = [...garments];
    updated[index].notes = value;
    setGarments(updated);
  };

  const getTotal = (sizes) => Object.values(sizes).reduce((a, b) => a + b, 0);

  const styleOptions = {
    Shirts: [
      "AS Colour 5026 - Classic Tee",
      "AS Colour 4026 - Staple Tee",
      "AS Colour 4001 - Block Tee",
      "AS Colour 500 - Paper Tee",
      "AS Colour 5080 - Organic Tee",
      "AS Colour 5050 - Heavy Tee",
      "AS Colour 5051 - Heavy V-Neck Tee",
      "Gildan H000 - Hammer Tee",
      "Gildan 65000 - Softstyle Midweight Tee",
      "Gildan 5000 - Heavy Cotton Tee",
      "Gildan 1301 - Ultra Cotton Tee",
    ],
    Hoodies: [
      "AS Colour 5101 - Supply Hood",
      "AS Colour 5102 - Stencil Hood",
      "AS Colour 5161 - Base Hood",
      "AS Colour 5109 - Heavy Hood",
      "Gildan 1467 - DryBlend Hoodie",
      "Gildan SF500 - Softstyle Hoodie",
      "Gildan 18500 - Heavy Blend Hoodie",
    ],
    "Long Sleeves": [
      "AS Colour 5071 - Base Long Sleeve",
      "AS Colour 4073 - Classic Long Sleeve",
      "AS Colour 5072 - Premium Long Sleeve",
      "AS Colour 5020 - Organic Long Sleeve",
      "Gildan 2400 - Ultra Cotton Long Sleeve",
      "Gildan 5400 - Heavy Cotton Long Sleeve",
    ],
    Totes: [
      "AS Colour 1001 - Carrie Tote",
      "AS Colour 1002 - Canvas Tote",
      "AS Colour 1000 - Market Tote",
      "AS Colour 1007 - Mini Tote",
    ],
    Hats: [
      "AS Colour 1140 - Finn Five Panel Cap",
      "AS Colour 1160 - Surf Cap",
      "AS Colour 1180 - Bucket Hat",
      "AS Colour 1103 - Snapback Cap",
      "AS Colour 1132 - Dad Cap",
      "AS Colour 1161 - Cord Cap",
    ],
  };

  const allDecorationOptions = [
    "Screen Print",
    "Digital Print",
    "Heat Press",
    "Embroidery",
  ];
  const hatDecorationOptions = ["Heat Press", "Embroidery"];
  const placementOptions = [
    "Front Print",
    "Back Print",
    "Right Sleeve Print",
    "Left Sleeve Print",
  ];
  const totePlacementOptions = ["Front Print", "Back Print"];
  const hatPlacementOptions = ["Front Print", "Back Print"];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form
        action="https://formsubmit.co/benny@makemerchandise.com.au"
        method="POST"
        encType="multipart/form-data"
        className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6"
      >
        <input
          name="name"
          className="w-full border p-2 rounded"
          placeholder="Your Name"
          required
        />
        <input
          name="band_or_business"
          className="w-full border p-2 rounded"
          placeholder="Band or Business Name"
          required
        />
        <input
          name="phone"
          className="w-full border p-2 rounded"
          placeholder="Phone Number"
          required
        />
        <input
          name="email"
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email"
          required
        />
        <input
          name="address"
          className="w-full border p-2 rounded"
          placeholder="Delivery Address"
          required
        />

        {garments.map((garment, index) => (
          <div key={index} className="border p-4 rounded space-y-4">
            <label className="block font-medium mb-1">
              Garment Design Type
            </label>
            <select
              name={`garment_type_${index}`}
              className="w-full border p-2 rounded"
              value={garment.type}
              onChange={(e) => handleGarmentTypeChange(index, e.target.value)}
              required
            >
              {garmentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {styleOptions[garment.type] && (
              <div>
                <label className="block font-medium mb-1">Garment Style</label>
                <select
                  name={`garment_style_${index}`}
                  className="w-full border p-2 rounded"
                  value={garment.style}
                  onChange={(e) => handleStyleChange(index, e.target.value)}
                  required
                >
                  <option value="">Select a style</option>
                  {styleOptions[garment.type].map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block font-medium mb-1">
                Decoration Preference
              </label>
              <select
                name={`decoration_${index}`}
                className="w-full border p-2 rounded"
                value={garment.decoration}
                onChange={(e) => handleDecorationChange(index, e.target.value)}
                required
              >
                <option value="">Select a decoration method</option>
                {(garment.type === "Hats"
                  ? hatDecorationOptions
                  : allDecorationOptions
                ).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {(garment.type === "Shirts" ||
              garment.type === "Hoodies" ||
              garment.type === "Long Sleeves" ||
              garment.type === "Totes" ||
              garment.type === "Hats") && (
              <div>
                <label className="block font-medium mb-1">
                  Print Placement
                </label>
                <div className="flex flex-wrap gap-4">
                  {(garment.type === "Totes"
                    ? totePlacementOptions
                    : garment.type === "Hats"
                    ? hatPlacementOptions
                    : placementOptions
                  ).map((placement) => (
                    <label key={placement} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={garment.placements.includes(placement)}
                        onChange={() =>
                          handlePlacementsChange(index, placement)
                        }
                      />
                      {placement}
                    </label>
                  ))}
                </div>
                {garment.placements.map((placement) => (
                  <div key={placement}>
                    <label className="block font-medium mt-3">
                      Upload Artwork ({placement})
                    </label>
                    <input
                      type="file"
                      name={`artwork_${index}_${placement}`}
                      className="w-full"
                      onChange={(e) =>
                        handleArtworkChange(index, placement, e.target.files[0])
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            {garment.type !== "Totes" && garment.type !== "Hats" && (
              <div>
                <label className="block font-medium mb-1">
                  Size Breakdown (Minimum 25 units)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {sizeKeys.map((size) => (
                    <input
                      key={size}
                      name={`${size}_${index}`}
                      type="number"
                      placeholder={size}
                      className="border p-2 rounded"
                      value={garment.sizes[size] || ""}
                      onChange={(e) =>
                        handleSizeChange(index, size, e.target.value)
                      }
                      min={0}
                    />
                  ))}
                </div>
                <p className="text-sm text-right text-gray-500">
                  Total: {getTotal(garment.sizes)}
                </p>
                {getTotal(garment.sizes) < 25 && (
                  <p className="text-sm text-red-500">
                    Minimum 25 units required.
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block font-medium mb-1">Design Notes</label>
              <textarea
                name={`design_notes_${index}`}
                className="w-full border p-2 rounded"
                placeholder="Any specific requests or info about this design"
                value={garment.notes}
                onChange={(e) => handleNotesChange(index, e.target.value)}
              ></textarea>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={addGarment}
        >
          + Add Another Garment Design
        </button>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
        >
          Submit Enquiry / Order
        </button>
      </form>
    </div>
  );
}
