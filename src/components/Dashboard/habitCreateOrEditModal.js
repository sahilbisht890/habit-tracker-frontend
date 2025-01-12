import React, { useState, useEffect, useContext} from "react";
import { Modal, Form, Input, Button, InputNumber } from "antd";
import axiosInstance from "../../utils/axios";
import { AppContext } from "../../createContext";
import dayjs from 'dayjs';

const HabitModal = ({
  type,
  habitDetails = {},
  visible,
  setIsVisible,
  fetchHabitList,
  fetchHabitTrackerList,
}) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
    const {selectedDate} = useContext(AppContext);
  

  useEffect(() => {
    if (type === "edit" && habitDetails) {
      form.setFieldsValue({
        name: habitDetails.name,
        dailyGoal: habitDetails.dailyGoal,
        unit: habitDetails.unit,
        progress: habitDetails.progress,
      });
    }else if(type === 'update' && habitDetails){
      form.setFieldsValue({
        name: habitDetails.name,
        dailyGoal: habitDetails.dailyGoal,
        unit: habitDetails.unit,
      });
    } 
    else {
      form.resetFields();
    }
  }, [type, habitDetails, form]);

  const handleFinish = (values) => {
    if (values.progress > values.dailyGoal) {
      form.setFields([
        {
          name: "progress",
          errors: ["Progress cannot be greater than the daily goal"],
        },
      ]);
      return;
    }
    setIsSubmitting(true);
    if (type === "edit") {
      handleUpdate(values);
    }else if(type === 'update')
      {
      handleHabitUpdate(values);
      } else {
      handleCreate(values);
    }
  };


  const handleHabitUpdate = async (values) => {
    try {
      const data = {
        id : habitDetails.id ,
        name : values.name ,
        dailyGoal : values.dailyGoal,
        unit : values.unit
      }
      const response = await axiosInstance.post("updateHabit", data);
      if (response.data?.success) {
        setIsVisible(false);
        await fetchHabitList();
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsSubmitting(false);
      form.resetFields();
    }
  }

  const handleUpdate = async (values) => {
    try {
      const data = {
        status: values.dailyGoal === values.progress ? "complete" : "incomplete",
        progress: values.progress,
        id: habitDetails?.id,
      };
      const response = await axiosInstance.patch("updateHabitProgress", data);
      if (response.data?.success) {
       setIsVisible(false);
      const today = dayjs().format("DD-MM-YYYY");
      await fetchHabitTrackerList(today);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsSubmitting(false);
      form.resetFields();
    }
  };

  const handleCreate = async (values) => {
    try {
      const response = await axiosInstance.post("createNewHabit", values);
      if (response.data?.success) {
        setIsVisible(false);
        await fetchHabitList();
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsSubmitting(false);
      form.resetFields();
    }
  };

  const onClose = () => {
    setIsVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      title={type === "edit" || type === 'update' ? "Edit Habit" : "Create Habit"}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        className='habitModal'
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        disabled={isSubmitting}
        initialValues={{
          name: "",
          dailyGoal: 0,
          unit: "",
          progress: 0,
        }}
      >
        <Form.Item
          label="Habit Name"
          name="name"
          rules={[{ required: true, message: "Please enter the habit name" }]}
        >
          <Input
            disabled={type === "edit"}
            placeholder="Enter habit name"
            style={{ height: "40px" }}
            className ='rounded'
          />
        </Form.Item>

        <Form.Item
          label="Daily Goal"
          name="dailyGoal"
          rules={[{ required: true, message: "Please enter the daily goal" }]}
        >
          <InputNumber
            disabled={type === "edit"}
            min={1}
            placeholder="Enter daily goal"
            className="w-full rounded"
            style={{ height: "40px", width: "100%" }}

          />
        </Form.Item>

        <Form.Item
          label="Unit"
          name="unit"
          rules={[{ required: true, message: "Please enter a unit" }]}
        >
          {type === "edit" ? (
            <Input
              disabled
              placeholder="Unit (e.g., Km, minutes, glasses, etc.)"
              style={{ height: "40px" }}
              className ='rounded'

            />
          ) : (
            <Input
              placeholder="Enter a unit (e.g., Km, minutes, glasses, etc.)"
              style={{ height: "40px" }}
              className="rounded"
            />
          )}
        </Form.Item>

        {type === "edit" && (
          <Form.Item
            label="Progress"
            name="progress"
            rules={[
              {
                required: true,
                message: "Please enter the current progress",
              },
            ]}
          >
            <InputNumber
              min={0}
              placeholder="Enter progress"
              className="w-full rounded"
              style={{ height: "40px", width: "100%" }}
            />
          </Form.Item>
        )}

        <Form.Item className="text-center">
          <Button
            htmlType="submit"
            className="rounded-md text-white  bg-pink-700 hover:scale-105 w-1/2 font-semibold"
          >
            {type === "edit" || type === "update" ? "Update Habit" : "Create Habit"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HabitModal;
