import axios from 'axios'
import type { AxiosInstance, AxiosError } from 'axios'

const API_URL = 'http://localhost:3000'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Add request interceptor to attach token
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  // Auth endpoints
  async login(email: string, password: string) {
    try {
      const response = await this.client.post('/login', { email, password })
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status && axiosError.response.status !== 404) {
        throw error
      }

      const fallbackResponse = await this.client.get('/users', {
        params: { email },
      })
      const user = fallbackResponse.data[0]
      if (user && user.password === password) {
        const token = `token_${user.id}_${Date.now()}`
        return { accessToken: token, user }
      }

      throw new Error('Invalid credentials')
    }
  }

  async signup(email: string, password: string, name: string, role: 'admin' | 'doctor') {
    const authPayload = { email, password, name, role }

    try {
      const response = await this.client.post('/register', authPayload)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status && axiosError.response.status !== 404) {
        throw error
      }

      const newUser = { ...authPayload, doctorId: null as number | null }
      const response = await this.client.post('/users', newUser)
      const token = `token_${response.data.id}_${Date.now()}`
      return { accessToken: token, user: response.data }
    }
  }

  // Clinics
  getClinics() {
    return this.client.get('/clinics')
  }

  getClinic(id: number) {
    return this.client.get(`/clinics/${id}`)
  }

  createClinic(data: any) {
    return this.client.post('/clinics', data)
  }

  updateClinic(id: number, data: any) {
    return this.client.patch(`/clinics/${id}`, data)
  }

  deleteClinic(id: number) {
    return this.client.delete(`/clinics/${id}`)
  }

  // Doctors
  getDoctors(clinicId?: number) {
    const params = clinicId ? { clinicId } : {}
    return this.client.get('/doctors', { params })
  }

  getDoctor(id: number) {
    return this.client.get(`/doctors/${id}?_expand=clinic`)
  }

  createDoctor(data: any) {
    return this.client.post('/doctors', data)
  }

  updateDoctor(id: number, data: any) {
    return this.client.patch(`/doctors/${id}`, data)
  }

  deleteDoctor(id: number) {
    return this.client.delete(`/doctors/${id}`)
  }

  // Patients
  getPatients(doctorId?: number) {
    const params = doctorId ? { doctorId } : {}
    return this.client.get('/patients', { params })
  }

  getPatient(id: number) {
    return this.client.get(`/patients/${id}`)
  }

  createPatient(data: any) {
    return this.client.post('/patients', data)
  }

  updatePatient(id: number, data: any) {
    return this.client.patch(`/patients/${id}`, data)
  }

  deletePatient(id: number) {
    return this.client.delete(`/patients/${id}`)
  }

  // Medications
  getMedications() {
    return this.client.get('/medications')
  }

  getMedication(id: number) {
    return this.client.get(`/medications/${id}`)
  }

  createMedication(data: any) {
    return this.client.post('/medications', data)
  }

  updateMedication(id: number, data: any) {
    return this.client.patch(`/medications/${id}`, data)
  }

  deleteMedication(id: number) {
    return this.client.delete(`/medications/${id}`)
  }

  // Prescriptions
  getPrescriptions(doctorId?: number, patientId?: number) {
    const params: any = {}
    if (doctorId) params.doctorId = doctorId
    if (patientId) params.patientId = patientId
    return this.client.get('/prescriptions', { params })
  }

  getPrescription(id: number) {
    return this.client.get(`/prescriptions/${id}`)
  }

  createPrescription(data: any) {
    return this.client.post('/prescriptions', data)
  }

  updatePrescription(id: number, data: any) {
    return this.client.patch(`/prescriptions/${id}`, data)
  }

  deletePrescription(id: number) {
    return this.client.delete(`/prescriptions/${id}`)
  }

  // Users
  getUsers() {
    return this.client.get('/users')
  }

  getUser(id: number) {
    return this.client.get(`/users/${id}`)
  }

  updateUser(id: number, data: any) {
    return this.client.patch(`/users/${id}`, data)
  }

  deleteUser(id: number) {
    return this.client.delete(`/users/${id}`)
  }

  // Appointments
  getAppointments(doctorId?: number) {
    const params = doctorId ? { doctorId } : {}
    return this.client.get('/appointments', { params })
  }

  getAppointment(id: number) {
    return this.client.get(`/appointments/${id}`)
  }

  createAppointment(data: any) {
    return this.client.post('/appointments', data)
  }

  updateAppointment(id: number, data: any) {
    return this.client.patch(`/appointments/${id}`, data)
  }

  deleteAppointment(id: number) {
    return this.client.delete(`/appointments/${id}`)
  }

  // Lab Tests
  getLabTests() {
    return this.client.get('/labTests')
  }

  getLabTest(id: number) {
    return this.client.get(`/labTests/${id}`)
  }

  createLabTest(data: any) {
    return this.client.post('/labTests', data)
  }

  updateLabTest(id: number, data: any) {
    return this.client.patch(`/labTests/${id}`, data)
  }

  deleteLabTest(id: number) {
    return this.client.delete(`/labTests/${id}`)
  }
}

export const apiClient = new ApiClient()
