import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import {
  IconPlus,
  IconEdit,
  IconCircleCheckFilled,
  IconCircleDotFilled,
  IconTrashFilled,
} from "@tabler/icons-react";
import { Spin, Tooltip, DatePicker } from "antd";
import HabitModal from "./habitCreateOrEditModal";
import axiosInstance from "../../utils/axios";
import dayjs from "dayjs";
import HabitCompletionChart from "./habitPieChart";
import { AppContext } from "../../createContext";

const Dashboard = () => {
  const {
    habits,
    setHabits,
    todayHabits,
    setTodayHabits,
    selectedDate,
    setSelectedDate,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState("");
  const [visible, setIsVisible] = useState(false);
  const [habitDetails, setHabitDetails] = useState({});
  const today = dayjs().format("DD-MM-YYYY");

  const apiCalled = useRef(false);
  const [isChartDataFetched, setIsChartDataFetched] = useState(false);
  const [chartData, setCharData] = useState({
    completedCount: 0,
    totalCount: 0,
  });

  useEffect(() => {
    if (!apiCalled.current && !habits) {
      const formattedDate = dayjs(new Date()).format("DD-MM-YYYY");
      apiCalled.current = true;
      setLoading(true);
      fetchHabitList();
      fetchHabitTrackerList(formattedDate);
    }
  }, []);

  useEffect(() => {
    if (todayHabits && todayHabits.length > 0) {
      const totalCount = todayHabits.length;
      const completedCount = todayHabits.filter(
        (item) => item.status === "complete"
      ).length;
      setCharData({
        totalCount,
        completedCount,
      });
      setIsChartDataFetched(true);
    }
  }, [todayHabits]);

  const handleEditAction = (habitData) => {
    setActionType("edit");
    setHabitDetails(habitData);
    setIsVisible(true);
  };

  const handleCreateHabit = () => {
    setActionType("create");
    setIsVisible(true);
  };

  const fetchHabitList = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("userHabitList");
      if (response.data?.success) {
        const habitList = response.data?.data;
        setHabits(habitList);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = async (date) => {
    const formattedDate = dayjs(date).format("DD-MM-YYYY");
    setSelectedDate(formattedDate);
    await fetchHabitTrackerList(formattedDate);
  };

  const fetchHabitTrackerList = async (date) => {
    setLoading(true);
    try {
      console.log("datecoming", date);
      const data = { date: date };
      const response = await axiosInstance.post("habitTrackerList", data);
      if (response.data?.success) {
        const habitList = response.data?.data;
        setTodayHabits(habitList);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabitForToday = async (habit) => {
    setLoading(true);
    const formattedDate = dayjs(new Date()).format("DD-MM-YYYY");
    try {
      const data = { habitId: habit.id, date: formattedDate };
      const response = await axiosInstance.post("addNewHabitToTrack", data);
      if (response.data?.success) {
        console.log("Habit Added Successfully in tracker List");
        if (selectedDate === today) {
          await fetchHabitTrackerList(today);
        }
      }
    } catch (error) {
      console.log("Error while adding habit in Today's List", error);
    } finally {
      setLoading(false);
    }
  };

  const HandleHabitDelete = async (habit) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete("deleteUserHabit", {
        params: {
          habitId: habit.id,
        },
      });
      if (response.data.success) {
        await fetchHabitList();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const HandleHabitTrackerDelete = async (habit) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete("deleteHabitFromTracker", {
        params: {
          habitTrackerId: habit.id,
        },
      });
      if (response.data.success) {
        await fetchHabitTrackerList();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHabit = async (habit) => {
    setHabitDetails(habit);
    setActionType("update");
    setIsVisible(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen p-4 bg-pink-50 dark:bg-gray-900 dark:text-gray-200">
      <HabitModal
        type={actionType}
        habitDetails={habitDetails}
        visible={visible}
        setIsVisible={setIsVisible}
        fetchHabitList={fetchHabitList}
        fetchHabitTrackerList={fetchHabitTrackerList}
      />
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="md:w-1/3 w-full p-4 h-[90rem] md:h-full  bg-pink-300 dark:bg-gray-800 rounded-lg shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base md:text-lg font-bold">Your Habits</h2>
              <button
                className="flex items-center bg-pink-700 text-white px-3 py-1 rounded-md hover:scale-x-105 dark:bg-white dark:text-gray-800"
                onClick={handleCreateHabit}
              >
                <IconPlus className="w-4 text-sm md:text-base h-4 md:w-5 md:h-5 mr-1" />
                New Habit
              </button>
            </div>
            <ul className="space-y-3">
              {habits && habits?.length > 0 ? (
                habits.map((habit) => (
                  <li
                    key={habit.id}
                    className="p-3 bg-white dark:bg-gray-700 rounded-lg shadowbox flex justify-between items-center"
                  >
                    <span className="font-medium text-base">{habit.name}</span>
                    <div className="flex justify-between items-center gap-2">
                      <button
                        className="text-pink-700 dark:text-white hover:scale-105"
                        onClick={() => handleAddHabitForToday(habit)}
                      >
                        <Tooltip title="Add Habit For Today">
                          <IconPlus className="w-5 h-5" />
                        </Tooltip>
                      </button>
                      <button
                        className="text-pink-700 dark:text-white hover:scale-105"
                        onClick={() => handleUpdateHabit(habit)}
                      >
                        <Tooltip title="Update the Habit">
                          <IconEdit className="w-5 h-5" />
                        </Tooltip>
                      </button>
                      <button
                        className="text-red-700 dark:text-red-400 hover:scale-105"
                        onClick={() => HandleHabitDelete(habit)}
                      >
                        <Tooltip title="Delete Habit">
                          <IconTrashFilled className="w-5 h-5" />
                        </Tooltip>
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <div className="flex justify-center items-center h-40">
                  <p className="text-gray-600 dark:text-gray-300 font-medium">
                    No habits added
                  </p>
                </div>
              )}
            </ul>
          </div>

          <div className="md:w-2/3 w-full mt-6 md:mt-0 h-[90rem] md:h-full md:ml-6 p-4 bg-pink-300 dark:bg-gray-800 rounded-lg shadow-lg overflow-y-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h2 className="text-base md:text-lg font-semibold mb-4 text-center md:mb-0 md:mr-4">
                {selectedDate === today
                  ? "Today's Habits"
                  : `Selected Date: ${selectedDate}`}
              </h2>
              <div className="text-center">
                <DatePicker
                  onChange={handleDateChange}
                  format="DD-MM-YYYY"
                  placeholder="Choose date"
                  allowClear={false}
                  value={dayjs(selectedDate, "DD-MM-YYYY")}
                  disabledDate={(current) => current.isAfter(dayjs(), "day")}
                />
              </div>
            </div>

            <div className="flex justify-center">
              {todayHabits && todayHabits.length > 0 && isChartDataFetched && (
                <HabitCompletionChart
                  completedCount={chartData.completedCount}
                  totalCount={chartData.totalCount}
                />
              )}
            </div>

            <div> </div>
            <div
              className={`grid grid-cols-1 ${
                todayHabits && todayHabits?.length > 0 && "md:grid-cols-2"
              } gap-4`}
            >
              {todayHabits && todayHabits.length > 0 ? (
                todayHabits.map((habit, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white dark:bg-gray-700 rounded-lg shadowbox"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-base md:text-lg">
                        {habit.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <button
                          className="text-pink-700 dark:text-white hover:scale-105"
                          onClick={() => handleEditAction(habit)}
                        >
                          <Tooltip title="Update the Progress">
                            <IconEdit className="w-5 h-5" />
                          </Tooltip>
                        </button>
                        <button
                          className="text-red-700 dark:text-red-400 hover:scale-105"
                          onClick={() => HandleHabitTrackerDelete(habit)}
                        >
                          <Tooltip title="Delete the Tracking Habit">
                            <IconTrashFilled className="w-5 h-5" />
                          </Tooltip>
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-base md:text-md font-semibold text-pink-700 dark:text-white">
                      <p>
                        Progress: {habit.progress} / {habit.dailyGoal}{" "}
                        {habit.unit}
                      </p>
                      <div
                        className={`flex items-center ${
                          habit.status === "complete"
                            ? "text-green-600 dark:text-green-400"
                            : "text-yellow-700 dark:text-yellow-500"
                        }`}
                      >
                        <span className="text-base md:text-md font-semibold">
                          Status {"   "} : {"   "}
                        </span>
                        {habit.status === "complete" ? (
                          <IconCircleCheckFilled className="w-6 h-6" />
                        ) : (
                          <IconCircleDotFilled className="w-6 h-6" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-64">
                  <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                    No habits added to Track
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
