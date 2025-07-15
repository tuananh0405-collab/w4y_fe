import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import check from "check-types";

const CheckBoxSx = {
  color: "#00796b",
  "&.Mui-checked": {
    color: "#00796b",
  },
  "&.MuiCheckbox-indeterminate": {
    color: "#00796b",
  },
};

// Helper for getting all category ids in a subtree
function getAllIds(category) {
  let ids = [category._id];
  category.children.forEach((child) => {
    ids = ids.concat(getAllIds(child));
  });
  return ids;
}

function NestedCategoryList({
  categories,
  multiple,
  checkedIds,
  handleToggle,
  parentDisabled = false,
  categoryObject,
}) {
  useEffect(() => {
  }, [checkedIds]);

  // Checked = category id in checkedIds. Indeterminate if some (but not all) children are checked.
  const getCheckboxState = (cat) => {
    const checked = checkedIds.includes(cat._id);
    let indeterminate = false;
    if (multiple && cat.children.length) {
      const childIds = cat.children.map((child) => getAllIds(child)).flat();
      const checkedChildCount = childIds.filter((id) =>
        checkedIds.includes(id)
      ).length;
      if (checkedChildCount > 0 && checkedChildCount < childIds.length) {
        indeterminate = true;
      }
    }
    return { checked, indeterminate };
  };

  return (
    <List disablePadding>
      {categories.map((cat) => {
        const { checked, indeterminate } = getCheckboxState(cat);
        if (cat.children && cat.children.length) {
          return (
            <Accordion
              key={cat._id}
              defaultExpanded={false}
              sx={{
                boxShadow: "none",
                border: "none",
                background: "none",
                margin: 0,
                "&:before": { display: "none" },
                p: 0,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  p: 0,
                  margin: 0,
                  minHeight: "unset !important",
                  "&.Mui-expanded": {
                    minHeight: "unset !important",
                  },
                  "& .MuiAccordionSummary-content": {
                    my: 0,
                    margin: 0,
                    "&.Mui-expanded": {
                      my: 0,
                      margin: 0,
                    },
                  },
                }}
              >
                <ListItem
                  dense
                  disableGutters
                  onClick={(e) => e.stopPropagation()}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked}
                      indeterminate={indeterminate}
                      tabIndex={-1}
                      disabled={parentDisabled}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleToggle(
                          cat,
                          categoryObject,
                          e.target.checked,
                        );
                      }}
                      sx={CheckBoxSx}
                    />
                  </ListItemIcon>
                  <ListItemText primary={cat.name} />
                </ListItem>
              </AccordionSummary>
              <AccordionDetails sx={{ pl: 3, py: 0.5 }}>
                <NestedCategoryList
                  categories={cat.children}
                  multiple={multiple}
                  checkedIds={checkedIds}
                  handleToggle={handleToggle}
                  parentDisabled={parentDisabled}
                  categoryObject={cat}
                  parentCategoryObject={categoryObject}
                />
              </AccordionDetails>
            </Accordion>
          );
        } else {
          return (
            <ListItem
              key={cat._id}
              dense
              disableGutters
              disabled={parentDisabled}
              onClick={(e) => e.stopPropagation()}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked}
                  tabIndex={-1}
                  disabled={parentDisabled}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggle(cat, categoryObject, e.target.checked);
                  }}
                  sx={CheckBoxSx}
                />
              </ListItemIcon>
              <ListItemText primary={cat.name} />
            </ListItem>
          );
        }
      })}
    </List>
  );
}

// Top-level usage:
export default function JobCategorySelector(
  { categories, multiple = true, onSelect, checkedIds },
) {
  // The internal state of the component that will be used if checkedIds is not provided (the state of the component will not be controlled by props in that case)
  const [uncontrolledCheckedIds, uncontrolledSetCheckedIds] = useState([]);

  const unifiedCheckedIdsList = useMemo(() => {
    return checkedIds ? checkedIds : uncontrolledCheckedIds;
  }, [checkedIds, uncontrolledCheckedIds]);

  const handleSetCheckedIds = useCallback((values) => {
    if (onSelect) {
      onSelect(values);
    }
    uncontrolledSetCheckedIds(values);
  }, [onSelect, uncontrolledSetCheckedIds]);

  const handleToggle = useCallback(
    (categoryObject, parentCategoryObject, checked) => {
      let newChecked;
      const allChildIds = getAllIds(categoryObject);
      if (multiple) {
        if (checked) {
          // Add parent and all children
          newChecked = [...new Set([...unifiedCheckedIdsList, ...allChildIds])];
          if (
            parentCategoryObject && check.array(parentCategoryObject.children)
          ) {
            // Check to see if array of ids of children of the current category is in the array unifiedCheckedIdsList
            // In other words, check if all of the children of the parent is checked
            if (
              check.all(
                check.map(
                  parentCategoryObject.children.map((child) => child._id),
                  (val) => check.contains(newChecked, val),
                ),
              )
            ) newChecked = [...newChecked, parentCategoryObject._id];
          }
        } else {
          // Remove parent and all children
          const filter = parentCategoryObject
            ? (id) =>
              !(allChildIds.includes(id) || id === parentCategoryObject._id)
            : (id) => !allChildIds.includes(id);
          newChecked = unifiedCheckedIdsList.filter(filter);
        }
      } else {
        newChecked = checked ? [categoryObject._id] : [];
      }
      handleSetCheckedIds(newChecked);
    },
    [unifiedCheckedIdsList, handleSetCheckedIds, multiple],
  );

  return (
    <NestedCategoryList
      categories={categories}
      multiple={multiple}
      checkedIds={unifiedCheckedIdsList}
      handleToggle={handleToggle}
      categoryObject={null}
    />
  );
}
