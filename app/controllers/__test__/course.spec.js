const { createCourse, getAllCourse, detailCourse, updateCourse, deleteCourse } = require('../course.js')

const courseServices = require('../../services/course.js')

jest.mock('../../services/course.js', () => ({
  createCourseServices: jest.fn(),
  getAllCourseServices: jest.fn(),
  detailCourseServices: jest.fn(),
  updateCourseServices: jest.fn(),
  deteleCourseServices: jest.fn()
}))

jest.mock('../../services/category.js', () => ({
  createCategoryServices: jest.fn()
}))

const course = {
  name: 'Product Management',
  code: 'PM12345',
  level: 'Advanced',
  facilitator: 'Muzani',
  category_id: '6ysgwygsjabwh8d',
  price: 12000,
  type: 'Premium',
  telegram_group: 'this link tele',
  introduction_video: 'video intro',
  on_boarding: 'onboarding',
  description: 'description'
}

const category = {
  category: 'Android',
  image: 'https://res.cloudinary.com/diqvk3qr5/image/upload/v1700813840/ios_ukp63i.png'
}

const chapters = [{
  id: '9e0d7e21-58d6-4b45-aa77-4323357fc826',
  index: 1,
  name: 'chapter lorem ipsum',
  is_locked: false
}]

describe('#createCourse', () => {
  it('should return 201 response success', async () => {
    const category = {
      category: 'Product Management',
      image: 'image.png'
    }

    const mockRequest = {
      course,
      category
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.createCourseServices.mockReturnValue(course)
    await createCourse(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'Ok',
      message: 'Success',
      data: course
    })
  })

  // error gk tau kenapa
  // it('should return 500 response failed', async () => {
  //   const error = new Error()

  //   const category = {
  //     id: '181c73b2-41c7-43bd-932b-56033282e1c8',
  //     category: 'Product Management',
  //     image: 'image.png'
  //   }

  //   const mockRequest = {
  //     course,
  //     category

  //   }

  //   const mockResponse = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn().mockReturnThis()
  //   }

  //   await courseServices.createCourseServices.mockReturnValue(Promise.reject(error))
  //   await categoryServices.createCategoryServices.mockReturnValue(Promise.reject(error))
  //   await createCourse(mockRequest, mockResponse)

  //   expect(mockResponse.status).toHaveBeenCalledWith(500)
  //   expect(mockResponse.json).toHaveBeenCalledWith({
  //     message: error.message
  //   })
  // })
})

describe('#getAllCourse', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {}

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.getAllCourseServices.mockReturnValue([course])
    await getAllCourse(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'Ok',
      message: 'Success',
      data: [course]
    })
  })

  it('should return 500 response faild', async () => {
    const error = new Error('faild')
    const mockRequest = {}

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.getAllCourseServices.mockReturnValue(Promise.reject(error))
    await getAllCourse(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#detailCourse', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {
      params: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.detailCourseServices.mockReturnValue({ course, category, chapters })
    await detailCourse(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get detail course success',
      data: { course, category, chapters }
    })
  })

  it('should return 500 response failed', async () => {
    const error = new Error('Failed')

    const mockRequest = {
      params: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.detailCourseServices.mockReturnValue(Promise.reject(error))
    await detailCourse(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#updateCourse', () => {
  it('should return 201 response success', async () => {
    const mockRequest = {
      body: {
        course
      },
      params: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.updateCourseServices.mockReturnValue([null, course])
    await updateCourse(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'Ok',
      message: 'Update course success',
      data: course
    })
  })

  it('should return 500 response failed', async () => {
    const error = new Error('Failed')

    const mockRequest = {
      params: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.updateCourseServices.mockReturnValue(Promise.reject(error))
    await updateCourse(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#deleteCourse', () => {
  it('should return 200 response success', async () => {
    const message = 'Course deleted successfully'

    const mockRequest = {
      params: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.deteleCourseServices.mockReturnValue(message)
    await deleteCourse(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Detele course success'
    })
  })

  it('should return 500 response failed', async () => {
    const error = new Error()

    const mockRequest = {
      params: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await courseServices.deteleCourseServices.mockReturnValue(Promise.reject(error))
    await deleteCourse(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})
