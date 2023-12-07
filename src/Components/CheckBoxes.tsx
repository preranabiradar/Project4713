import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";

export default function CheckBoxs() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [checkBoxData, setCheckBoxData] = React.useState([
    {
      department: "customer_service",
      sub_departments: [
        { name: "support", checked: false },
        { name: "customer_success", checked: false },
      ],
    },
    {
      department: "design",
      sub_departments: [
        { name: "graphic_design", checked: false },
        { name: "product_design", checked: false },
        { name: "web_design", checked: false },
      ],
    },
  ]);

  const handleCheckSubDepartment = (
    event: React.ChangeEvent<HTMLInputElement>,
    dept: string,
    subDept: string
  ) => {
    const newCheckData = checkBoxData.map((dt) => {
      if (dt.department === dept) {
        const newSubDept = dt.sub_departments.map((d) => {
          if (d.name === subDept) {
            return {
              name: d.name,
              checked: event.target.checked,
            };
          } else return d;
        });

        return {
          department: dt.department,
          sub_departments: newSubDept,
        };
      } else {
        return dt;
      }
    });

    setCheckBoxData(newCheckData);
  };

  const handleCheckDepartment = (
    event: React.ChangeEvent<HTMLInputElement>,
    dept: string
  ) => {
    const newCheckData = checkBoxData.map((dt) => {
      if (dt.department === dept) {
        const newSubDept = dt.sub_departments.map((d) => {
          return {
            name: d.name,
            checked: event.target.checked,
          };
        });

        return {
          department: dt.department,
          sub_departments: newSubDept,
        };
      } else {
        return dt;
      }
    });

    setCheckBoxData(newCheckData);
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      {checkBoxData?.map((data) => (
        <Accordion
          expanded={expanded === data.department}
          onChange={handleChange(data.department)}
        >
          <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
            <FormControlLabel
              label={data.department}
              control={
                <Checkbox
                  checked={
                    data.sub_departments?.filter((d) => d.checked === false)
                      ?.length === 0
                  }
                  onChange={(e) => handleCheckDepartment(e, data.department)}
                />
              }
            />
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              {data.sub_departments.map((sub) => (
                <FormControlLabel
                  label={sub.name}
                  control={
                    <Checkbox
                      checked={sub.checked}
                      onChange={(e) =>
                        handleCheckSubDepartment(e, data.department, sub.name)
                      }
                    />
                  }
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
