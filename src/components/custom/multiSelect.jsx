import React, { useState, useRef, useEffect } from "react";

const MultiSelect = ({
  name,
  options = [],
  label = "Select classes",
  maxSelections = null,
  value = [],
  allSelected,
  setAllSelected,
  onValueChange, // ✅ for RHF's field.onChange
  onBlur, // ✅ for RHF's field.onBlur
}) => {
  const [selectedValues, setSelectedValues] = useState(value || []);
  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);

  // Auto-detect keys dynamically (id/name or value/label)
  const [valueKey, labelKey] = React.useMemo(() => {
    if (options.length > 0) {
      const keys = Object.keys(options[0]);
      return [keys[0], keys[1] || keys[0]];
    }
    return ["value", "label"];
  }, [options]);

  // Sync external value → internal
  useEffect(() => {
    if (Array.isArray(value)) setSelectedValues(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateValue = (newValues) => {
    setSelectedValues(newValues);
    if (onValueChange) onValueChange(newValues);
  };

  const toggleOption = (val) => {
    const exists = selectedValues.includes(val);
    let next = exists
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];

    if (!exists && maxSelections && selectedValues.length >= maxSelections)
      return;

    updateValue(next);
    setAllSelected(false);
  };

  const handleSelectAll = () => {
    const allValues = options.map((o) => o[valueKey]);
    updateValue(allValues);
    setAllSelected(true);
  };

  const handleClearAll = () => {
    updateValue([]);
    setAllSelected(false);
  };

  const removeTag = (val) => {
    updateValue(selectedValues.filter((v) => v !== val));
  };

  return (
    <>
      <div className="flex">
        <label className="block text-sm font-medium px-1 text-gray-400 mb-2.5">
          {label}
        </label>
        <span className="text-red-600">*</span>
      </div>
      <div ref={containerRef} className="relative w-full">
        {/* Selected tags and trigger */}
        <div
          className="border rounded-lg px-3 py-2  flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen((s) => !s)}
          onBlur={onBlur}
          name={name}
        >
          <div className="flex flex-wrap gap-2 flex-1">
            {selectedValues.length === 0 ? (
              <span className="text-input-label-color select-none">
                {label}
              </span>
            ) : (
              selectedValues.map((val) => {
                const opt = options.find((o) => o[valueKey] === val) || {
                  [labelKey]: val,
                };
                return (
                  <span
                    key={val}
                    className="flex items-center gap-1  bg-card-header rounded-full px-2 py-0.5 text-sm"
                  >
                    <span>{opt[labelKey]}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(val);
                      }}
                      className="ml-1 text-gray-400 hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                );
              })
            )}
          </div>
        </div>

        {/* Dropdown */}
        {open && (
          <ul className="absolute z-30 mt-1 w-full max-h-64 overflow-auto border rounded-lg bg-primary-color shadow-lg py-1">
            <div className="flex justify-between">
              <li className="flex items-center gap-2 px-3 py-2 text-sm text-primary-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="accent-sidebar-accent cursor-pointer"
                />
                <span onClick={handleSelectAll}>Select All</span>
              </li>
              <li
                className="px-3 py-2 text-sm text-primary-text  cursor-pointer"
                onClick={handleClearAll}
              >
                Clear All
              </li>
            </div>

            <hr className="my-1 border-secondary-color " />

            {options.map((o) => {
              const checked = selectedValues.includes(o[valueKey]);
              return (
                <li
                  key={o[valueKey]}
                  onClick={() => toggleOption(o[valueKey])}
                  className={`flex items-center gap-2 px-3 py-2  cursor-pointer hover:bg-sidebar-accent 
                  }`}
                >
                  <input
                    readOnly
                    type="checkbox"
                    checked={checked}
                    className="w-4 h-4 accent-sidebar-accent"
                  />
                  <span className="text-sm text-primary-text flex-1">
                    {o[labelKey]}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default MultiSelect;
