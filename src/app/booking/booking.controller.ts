import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";
import { bookingServices } from "./booking.services";

const handleCreateRental = catchAsync(async(req, res) => {  
    const result  = await bookingServices.createRentalService(req.user, req.body);    
    successResponse(res, {
        success:true, 
        statusCode: 201, 
        message: "Rental created successfully", 
        data: result
    })
})
const handleCalculateRental = catchAsync(async(req, res) => {
    const result = await bookingServices.calculateBikeService(
      req.params.id,
      req.body.returnTime
    );
    successResponse(res, {
      success: true,
      statusCode: 201,
      message: "Bike fair calculated successfully",
      data: result,
    });
})
const handleReturnRental = catchAsync(async(req, res) => {
    const result  = await bookingServices.returnBikeService(req.params.id);
    successResponse(res, {
      success: true,
      statusCode: 201,
      message: "Bike returned successfully",
      data: result,
    });
})

// update booking after refund money
const handleUpdateBookingAfterReturnMoney = catchAsync(async(req, res) => {  
    const result = await bookingServices.updateBookingAfterRefundMoneyService(
      req.params.bookingId
    );
    successResponse(res, {
      success: true,
      statusCode: 201,
      message: "Booking updated after returned money successfully",
      data: result,
    });
})

const handleGetRentalsByUserId = catchAsync(async(req, res) => {    
    const result = await bookingServices.getRentalByUserIdService(req.user.userId);
    successResponse(res, {
        success:true, 
        statusCode: 201, 
        message: "Rentals retrieved successfully", 
        data: result
    })
})
const handleGetAllRentals = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllRentalsService();
  
  successResponse(res, {
    success: true,
    statusCode: 201,
    message:
      result.length === 0 ? "No Data Found" : "Rentals retrieved successfully",
    data: result,
  });
});

const handleDeleteBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.deleteRentalService(req.params.id);
  
  successResponse(res, {
    success: true,
    statusCode: 201,
    message:      "Rental deleted successfully",
    data: result,
  });
});


export const rentalController = {
  handleCreateRental,
  handleReturnRental,
  // handleGetRentalsById,
  handleGetRentalsByUserId,
  handleGetAllRentals,
  handleCalculateRental,
  handleUpdateBookingAfterReturnMoney,
  handleDeleteBooking,
};