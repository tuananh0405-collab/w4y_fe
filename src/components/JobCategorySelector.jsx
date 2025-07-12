import React, { useCallback, useState } from "react";
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
  setCheckedIds,
  parentDisabled = false,
}) {
  const handleToggle = useCallback(
    (cat, checked) => {
      let newChecked;
      const allChildIds = getAllIds(cat);
      if (multiple) {
        if (checked) {
          // Add parent and all children
          newChecked = [...new Set([...checkedIds, ...allChildIds])];
        } else {
          // Remove parent and all children
          newChecked = checkedIds.filter((id) => !allChildIds.includes(id));
        }
      } else {
        newChecked = checked ? [cat._id] : [];
      }
      setCheckedIds(newChecked);
    },
    [checkedIds, setCheckedIds, multiple],
  );

  // Checked = category id in checkedIds. Indeterminate if some (but not all) children are checked.
  const getCheckboxState = (cat) => {
    const checked = checkedIds.includes(cat._id);
    let indeterminate = false;
    if (multiple && cat.children.length) {
      const childIds = cat.children.map((child) => getAllIds(child)).flat();
      const checkedChildCount = childIds.filter((id) => checkedIds.includes(id)).length;
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
            <Accordion key={cat._id} disableGutters defaultExpanded={false}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <ListItem dense disableGutters onClick={(e) => e.stopPropagation()}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked}
                      indeterminate={indeterminate}
                      tabIndex={-1}
                      disabled={parentDisabled}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleToggle(cat, e.target.checked);
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={cat.name} />
                </ListItem>
              </AccordionSummary>
              <AccordionDetails>
                <NestedCategoryList
                  categories={cat.children}
                  multiple={multiple}
                  checkedIds={checkedIds}
                  setCheckedIds={setCheckedIds}
                  parentDisabled={parentDisabled}
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
                    handleToggle(cat, e.target.checked);
                  }}
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
  const [_checkedIds, _setCheckedIds] = useState([]);
  return (
    <NestedCategoryList
      categories={categories}
      multiple={multiple}
      checkedIds={checkedIds ? checkedIds : _checkedIds}
      setCheckedIds={(values) => {
        if (onSelect) {
          onSelect(values);
        }
        _setCheckedIds(values);
      }}
    />
  );
}
