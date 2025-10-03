import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { InputWithValidate, SelectBoxWithValidate } from "./inputs";
import ErrorShow from "./errorShow";

const DynamicTwoFieldsWithSelectBox = ({
  title,
  field1Name = "field1",
  field1Label,
  field1Placeholder,
  field2Name = "field2",
  field2Label,
  field2Placeholder,
  selectFieldName = "selectField",
  selectFieldLabel,
  selectFieldPlaceholder,
  selectOptions = [],
  value = [],
  onChange = () => {},
  errors,
}) => {
  const [rows, setRows] = useState(
    value?.length
      ? value
      : [
          {
            [field1Name]: "",
            [field2Name]: "",
            [selectFieldName]: "",
          },
        ]
  );

  // 🔑 Sync rows when value prop changes (e.g., RHF reset)
  useEffect(() => {
    const normalized = value?.length
      ? value
      : [
          {
            [field1Name]: "",
            [field2Name]: "",
            [selectFieldName]: "",
          },
        ];

    if (JSON.stringify(normalized) !== JSON.stringify(rows)) {
      setRows(normalized);
    }
  }, [value, field1Name, field2Name, selectFieldName]);

  // Keep parent form in sync
  useEffect(() => {
    onChange(rows);
  }, [rows]);

  const handleChange = (index, field, val) => {
    const newRows = [...rows];
    newRows[index][field] = val;
    setRows(newRows);
  };

  const handleAdd = () =>
    setRows([
      ...rows,
      {
        [field1Name]: "",
        [field2Name]: "",
        [selectFieldName]: "",
      },
    ]);

  const handleRemove = (index) => setRows(rows.filter((_, i) => i !== index));
  return (
    <div className="space-y-4">
      {rows.map((row, index) => (
        <fieldset
          key={index}
          className="border border-gray-300 rounded-xl p-4 relative"
        >
          <legend className="px-2 text-sm font-semibold text-gray-600">
            {title} {rows.length > 1 ? index + 1 : ""}
          </legend>

          <div className="grid grid-cols-12 gap-4">
            {/* Field 1 */}
            <div className="col-span-6">
              <InputWithValidate
                type="text"
                label={field1Label}
                placeholder={field1Placeholder}
                value={row[field1Name]}
                onChange={(e) =>
                  handleChange(index, field1Name, e.target.value)
                }
                className="w-full"
              />
              {errors?.[index]?.[field1Name] && (
                <ErrorShow error={errors[index][field1Name].message} />
              )}
            </div>

            {/* Field 2 */}
            <div className="col-span-6">
              <InputWithValidate
                type="text"
                label={field2Label}
                placeholder={field2Placeholder}
                value={row[field2Name]}
                onChange={(e) =>
                  handleChange(index, field2Name, e.target.value)
                }
                className="w-full"
              />
              {errors?.[index]?.[field2Name] && (
                <ErrorShow error={errors[index][field2Name].message} />
              )}
            </div>

            {/* Select Field */}
            <div className="col-span-12">
              <SelectBoxWithValidate
                label={selectFieldLabel}
                options={selectOptions}
                value={row[selectFieldName] || ""}
                onValueChange={(val) =>
                  handleChange(index, selectFieldName, val)
                }
              />
              {errors?.[index]?.[selectFieldName] && (
                <ErrorShow error={errors[index][selectFieldName].message} />
              )}
            </div>

            {/* Buttons */}
            <div
              className={`${rows.length > 1 ? "col-span-6" : "col-span-12"}`}
            >
              {index === rows.length - 1 && (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="p-2 w-full bg-green-500 text-white rounded hover:bg-green-600"
                >
                  <Plus size={18} />
                </button>
              )}
            </div>
            <div
              className={`${
                index === rows.length - 1 ? "col-span-6" : "col-span-12"
              }`}
            >
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-2 bg-red-500 w-full text-white rounded hover:bg-red-600"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export default DynamicTwoFieldsWithSelectBox;
